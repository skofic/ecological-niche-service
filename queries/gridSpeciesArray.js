'use strict'

const {aql} = require('@arangodb')


/**
 * This function will build the query according to the provided parameters.
 *
 * Return a map grid of species occurrence probabilities
 * for a specific period and model scenario as an array of arrays.
 *
 * Requires the following parameters:
 * - ${thePeriod}:  Period for data (e.g. "cur2005", "fut2035", "fut2065" and "fut2095").
 * - ${theSpecies}: Genus and species (e.g. "Abies alba").
 * - ${theScenario}: Future model scenario (e.g. "rcp45" or "rcp85"; ignored for ${thePeriod} cur2005).
 *
 * Returns:
 * - [0]: Decimal degrees longitude of grid cell center.
 * - [1]: Decimal degrees latitude of grid cell center.
 * - [2]: Species occurrence probability (0-100).
 *
 * If both theStart and theLimit are zero, all records will be returned.
 *
 * The function returns the final query.
 *
 * @param theCollection {collection}: Map grid collection (OCCURRENCE).
 * @param theSpecies {String}: The genus and species.
 * @param thePeriod {String}: The period.
 * @param theScenario {String}: T&he model scenario
 * @param theStart {Number}: The zero-based first record.
 * @param theLimit {Number}: The number of records to return.
 */
module.exports = function(
	theCollection,
	theSpecies,
	thePeriod, theScenario,
	theStart, theLimit)
{
	///
	// Query start.
	///
	const queryStart = aql`
FOR doc IN ${theCollection}
  FILTER ${theSpecies} IN doc.properties.species
  FILTER ${thePeriod} == "cur2005" ? doc.properties.probabilities.${theSpecies}.${thePeriod}.value
								   : doc.properties.probabilities.${theSpecies}.${thePeriod}.${theScenario}
         != null
	`
	
	///
	// Query limits.
	///
	const queryLimits = aql`
	LIMIT ${theStart}, ${theLimit}
	`
	
	///
	// Query end.
	///
	const queryEnd = aql`
RETURN [
  doc.geometry.coordinates[0],
  doc.geometry.coordinates[1],
  ${thePeriod} == "cur2005"
    ? doc.properties.probabilities.${theSpecies}.${thePeriod}.value
    : doc.properties.probabilities.${theSpecies}.${thePeriod}.${theScenario}
]
	`
	
	///
	// Build query.
	///
	if(theStart === 0 && theLimit === 0){
		return aql.join([queryStart, queryEnd])
	}
	
	return aql.join([queryStart, queryLimits, queryEnd])
	
}

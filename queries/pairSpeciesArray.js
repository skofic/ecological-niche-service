'use strict'

const {aql} = require('@arangodb')


/**
 * This function will build the query according to the provided parameters.
 *
 * Return array of X and Y axis indicator values and number of grid elements.
 *
 * The period parameter can take the following values:
 * - 1960-1990: Current period.
 * - 1991-2020: Future period.
 * - 2021-2050: Future period.
 * - 2051-2080: Future period.
 *
 * X and Y can take the following values:
 * - bio01: Mean annual air temperature.
 * - bio12: Annual precipitation amount.
 * - bio15: Precipitation seasonality.
 * - ci: Continentality.
 * - ps: Summer precipitation.
 * - pw: Winter precipitation.
 * - ts: Summer temperature.
 *
 * The query returns an array of arrays:
 * - [0]: X axis value.
 * - [1]: Y axis value.
 * - [2]: Number of matching grid items.
 *
 * If both theStart and theLimit are zero, all records will be returned.
 * 
 * The function returns the final query.
 * 
 * @param theGridCollection {collection}: Map grid collection (OCCURRENCE).
 * @param thePairCollection {collection}: Indicator pairs collection (PAIRS).
 * @param theSpecies {String}: The genus and species.
 * @param thePeriod {String}: The period.
 * @param theScenario {String}: The future period model scenario.
 * @param theX {String}: The X-axis indicator name.
 * @param theY {String}: The Y-axis indicator name.
 * @param theStart {Number}: The zero-based first record.
 * @param theLimit {Number}: The number of records to return.
 */
module.exports = function(
	theGridCollection, thePairCollection,
	theSpecies, thePeriod, theScenario,
	theX, theY,
	theStart, theLimit)
{
	///
	// Query start.
	///
	const queryStart = aql`
FOR spe IN ${theGridCollection}
	FILTER ${theSpecies} IN spe.properties.species

	FOR doc IN ${thePairCollection}
		FILTER GEO_INTERSECTS(spe.geometry, doc.geometry)
		FILTER HAS(${thePeriod} == "1960-1990" ? doc.properties.${thePeriod}
											   : doc.properties.${thePeriod}.${theScenario}, ${theX})
		FILTER HAS(${thePeriod} == "1960-1990" ? doc.properties.${thePeriod}
											   : doc.properties.${thePeriod}.${theScenario}, ${theY})
		
		COLLECT X = ${thePeriod} == "1960-1990" ? doc.properties.${thePeriod}.${theX}
											    : doc.properties.${thePeriod}.${theScenario}.${theX},
				Y = ${thePeriod} == "1960-1990" ? doc.properties.${thePeriod}.${theY}
											    : doc.properties.${thePeriod}.${theScenario}.${theY}
		WITH COUNT INTO items
	
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

	RETURN [ X, Y, items ]
	`
	
	///
	// Build query.
	///
	if(theStart === 0 && theLimit === 0){
		return aql.join([queryStart, queryEnd])
	}
	
	return aql.join([queryStart, queryLimits, queryEnd])
	
}

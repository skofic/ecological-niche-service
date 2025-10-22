'use strict'

const {aql} = require('@arangodb')


/**
 * This function will build the query according to the provided parameters.
 *
 * All indicator pair combinations for period and scenario as array.
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
 * Returns an array of objects:
 * - ${theX}: X axis value.
 * - ${theY}: Y axis value.
 * - items: Number of matching grid items.
 * 
 * If both theStart and theLimit are zero, all records will be returned.
 *
 * The function returns the final query.
 *
 * @param theCollection {collection}: Indicator pairs collection (PAIRS).
 * @param thePeriod {String}: The period.
 * @param theScenario {String}: The future period model scenario.
 * @param theX {String}: The X-axis indicator name.
 * @param theY {String}: The Y-axis indicator name.
 * @param theStart {Number}: The zero-based first record.
 * @param theLimit {Number}: The number of records to return.
 */
module.exports = function(
	theCollection,
	thePeriod, theScenario,
	theX, theY,
	theStart, theLimit)
{
	///
	// Query start.
	///
	const queryStart = aql`
FOR doc IN ${theCollection}
	
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
	
RETURN {
	${theX}: X,
	${theY}: Y,
	items: items
}
	`
	
	///
	// Build query.
	///
	if(theStart === 0 && theLimit === 0){
		return aql.join([queryStart, queryEnd])
	}
	
	return aql.join([queryStart, queryLimits, queryEnd])
	
}

'use strict'

const {aql} = require('@arangodb')


/**
 * This function will build the query according to the provided parameters.
 *
 * Return all grid points as an array of their coordinates.
 *
 * The query selects all records that have species occurrence probability,
 * regardless of the specific species.
 *
 * Requires the following parameters:
 * - @start: First record index (0 based).
 * - @limit: Number of records.
 *
 * Returns array:
 * - [0]: Decimal degrees longitude of grid cell center.
 * - [1]: Decimal degrees latitude of grid cell center.
 *
 * If both theStart and theLimit are zero, all records will be returned.
 *
 * The function returns the final query.
 *
 * @param theCollection {collection}: Map grid collection (OCCURRENCE).
 * @param theStart {Number}: The zero-based first record.
 * @param theLimit {Number}: The number of records to return.
 */
module.exports = function(
	theCollection,
	theStart, theLimit)
{
	///
	// Query start.
	///
	const queryStart = aql`
FOR doc IN ${theCollection}
	FILTER HAS(doc.properties, 'probabilities')
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
	doc.geometry.coordinates[1]
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

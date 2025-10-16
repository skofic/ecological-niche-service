'use strict'

/**
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
 * @type {string}
 */
const query = `
FOR doc IN @@collection
	FILTER HAS(doc.properties, 'probabilities')
	LIMIT @start, @limit
RETURN [
	doc.geometry.coordinates[0],
	doc.geometry.coordinates[1]
]
`

module.exports = query

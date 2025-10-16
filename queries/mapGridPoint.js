'use strict'

/**
 * Return all grid points as an array of GeoJSON points.
 *
 * The query selects all records that have species occurrence probability,
 * regardless of the specific species.
 *
 * Requires the following parameters:
 * - @start: First record index (0 based).
 * - @limit: Number of records.
 *
 * Returns GeoJSON point.
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
	FILTER HAS(doc.properties, 'probabilities')
	LIMIT @start, @limit
RETURN {
	geometry: doc.geometry
}
`

module.exports = query

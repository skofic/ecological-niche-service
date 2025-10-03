'use strict'

/**
 * Return count of all grid points.
 *
 * The query selects all records that have species occurrence probability,
 * regardless of the specific species.
 *
 * Returns an integer count of the grid cells.
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
	FILTER HAS(doc.properties, 'probabilities')
    COLLECT AGGREGATE items = LENGTH(doc)
RETURN items
`

module.exports = query

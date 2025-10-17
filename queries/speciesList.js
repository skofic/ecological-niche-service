'use strict'

/**
 * Return list of available species.
 *
 * The query expects the collection as a parameter.
 *
 * Returns an array of strings
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
	FILTER HAS(doc.properties, "species")
    COLLECT AGGREGATE species = UNIQUE(doc.properties.species)
RETURN SORTED_UNIQUE(FLATTEN(species))
`

module.exports = query

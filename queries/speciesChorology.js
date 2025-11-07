'use strict'

/**
 * Return the distribution geometry for the provided species.
 *
 * Requires the following parameters:
 * - @species: Genus and species (e.g. "Abies alba").
 *
 * Returns GeoJSON multi-polygon.
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
	FILTER doc.properties.species == @species
RETURN doc.geometry
`

module.exports = query

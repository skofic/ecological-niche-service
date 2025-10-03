'use strict'

/**
 * Return the number of available grid cells for the provided
 * species, period and eventual future model scenario.
 *
 * Requires the following parameters:
 * - @period:  Period for data (e.g. "cur2005", "fut2035", "fut2065" and "fut2095").
 * - @species: Genus and species (e.g. "Abies alba").
 * - @scenario: Future model scenario (e.g. "rcp45" or "rcp85"; ignored for @period cur2005).
 *
 * Returns integer with the grid cells count.
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
  FILTER @species IN doc.properties.species
  FILTER @period == "cur2005" ? doc.properties.probabilities.@species.@period.value
                              : doc.properties.probabilities.@species.@period.@scenario
                              != null
  COLLECT AGGREGATE items = LENGTH(doc)
RETURN items
`

module.exports = query

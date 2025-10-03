'use strict'

/**
 * Return a map grid of species occurrence probabilities
 * for a specific period and model scenario as an array of arrays.
 *
 * The map will contain a grid of rects:
 * Pixel Size 0.08333333333333332871,-0.08333333333333332871
 *
 * Requires the following parameters:
 * - @period:  Period for data (e.g. "cur2005", "fut2035", "fut2065" and "fut2095").
 * - @species: Genus and species (e.g. "Abies alba").
 * - @scenario: Future model scenario (e.g. "rcp45" or "rcp85"; ignored for @period cur2005).
 *
 * Returns:
 * - [0]: Decimal degrees longitude of grid cell center.
 * - [1]: Decimal degrees latitude of grid cell center.
 * - [2]: Species occurrence probability (0-100).
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
  FILTER @species IN doc.properties.species
  FILTER @period == "cur2005" ? doc.properties.probabilities.@species.@period.value
                              : doc.properties.probabilities.@species.@period.@scenario
                              != null
  LIMIT @start, @limit
RETURN [
  doc.geometry_point.coordinates[0],
  doc.geometry_point.coordinates[1],
  @period == "cur2005"
    ? doc.properties.probabilities.@species.@period.value
    : doc.properties.probabilities.@species.@period.@scenario
]
`

module.exports = query

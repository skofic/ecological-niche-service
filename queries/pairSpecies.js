'use strict'

/**
 * Indicator pair combinations for period and scenario,
 * for provided species.
 *
 * Requires the following parameters:
 * - @species: Genus and species of interest.
 * - @period:  Period for data (e.g. "1960-1990").
 * - @scenario: Future model scenario (e.g. "rcp45" or "rcp85"; ignored for @period 1960-1990).
 * - @X: Variable name for X axis (e.g. "bio1").
 * - @Y: Variable name for Y axis (e.g. "bio12").
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
 * Returns an array of arrays:
 * - [0]: X axis value.
 * - [1]: Y axis value.
 *
 * @type {string}
 */
const query = `
FOR doc IN @@collection
  FILTER @species IN doc.properties.species
  FILTER HAS(@period == "1960-1990" ? doc.properties.indicators.@period
                                    : doc.properties.indicators.@period.@scenario,
             @X)
  FILTER HAS(@period == "1960-1990" ? doc.properties.indicators.@period
                                    : doc.properties.indicators.@period.@scenario,
             @Y)
  
  COLLECT X = @period == "1960-1990" ? doc.properties.indicators.@period.@X
                                     : doc.properties.indicators.@period.@scenario.@X
  COLLECT Y = @period == "1960-1990" ? doc.properties.indicators.@period.@Y
                                     : doc.properties.indicators.@period.@scenario.@Y

  LIMIT @start, @limit
  
RETURN [X, Y]
`

module.exports = query

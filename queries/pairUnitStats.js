'use strict'

/**
 * Indicator pair combinations stats for unit, period and scenario.
 *
 * Requires the following parameters:
 * - @unit: Requested gene conservation unit (e.g. ITA00001).
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
 * The query returns one object with the following properties:
 * - stats: The total number of unique indicator pair values.
 * - @X: Statistics for the X-axis indicator:
 *   - min: Minimum X-axis value.
 *   - avg: Average X-axis value.
 *   - max: Maximum X-axis value.
 * - @Y: Statistics for the Y-axis indicator:
 *   - min: Minimum Y-axis value.
 *   - avg: Average Y-axis value.
 *   - max: Maximum Y-axis value.
 * - items: Statistics for number of grid matches per pair combination:
 *   - min: Minimum number of grid items per combination.
 *   - avg: Average number of grid items per combination.
 *   - max: Maximum number of grid items per combination.
 *
 * @type {string}
 */
const query = `
LET unit = (
	FOR doc IN @@unitPolygons
		FILTER doc._key == @unit
	RETURN doc
)

LET pairs = LENGTH(unit) == 0
	?   []
	:   (
			FOR doc IN @@pair
			
				FILTER GEO_INTERSECTS(unit[0].geometry, doc.geometry)
				FILTER HAS(@period == "1960-1990" ? doc.properties.@period
												  : doc.properties.@period.@scenario, @X)
				FILTER HAS(@period == "1960-1990" ? doc.properties.@period
												  : doc.properties.@period.@scenario, @Y)
				  
				COLLECT X = @period == "1960-1990" ? doc.properties.@period.@X
												   : doc.properties.@period.@scenario.@X,
		                Y = @period == "1960-1990" ? doc.properties.@period.@Y
												   : doc.properties.@period.@scenario.@Y
				WITH COUNT INTO items
		
			RETURN { X, Y, items }
		)

RETURN LENGTH(unit) == 0
	?   {
            count: 0
		}
	:   {
			count: LENGTH(pairs),
			@X: {
				min: MIN(pairs[*].X),
				avg: AVG(pairs[*].X),
				max: MAX(pairs[*].X)
			},
			@Y: {
				min: MIN(pairs[*].Y),
				avg: AVG(pairs[*].Y),
				max: MAX(pairs[*].Y)
			},
			items: {
				min: MIN(pairs[*].items),
				avg: AVG(pairs[*].items),
				max: MAX(pairs[*].items)
			},
			properties: unit[0].properties
		}
`

module.exports = query

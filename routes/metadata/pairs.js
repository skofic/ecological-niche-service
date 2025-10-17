'use strict'

/**
 * Indicator pairs service metadata.
 *
 * The metadata record contains the descriptions for all services
 * handling indicator pairs data.
 */

///
// Includes.
///
const dd = require('dedent')


///
// Metadata record.
///
const metadata =
	{
		stats: {
			summary: "Indicators pair statistics for period and scenario",
			description: dd`
			This service will return statistics related to the requested \
			indicators pair, period and scenario.
		`,
			response: dd`
**Indicator pair statistics**

- *count*: Total number of unique X and Y combinations.
- *@X*: Statistics for the X-axis indicator value: *min* minimum, \
*avg* average and *max* maximum.
- *@Y*: Statistics for the Y-axis indicator value: *min* minimum, \
*avg* average and *max* maximum.
- *items*: Statistics for the number of grid items matching the \
indicators pair value combinations: *min* minimum, *avg* average \
and *max* maximum.
			`
		},
		array: {
			summary: "Indicators pair values for period and scenario as array",
			description: dd`
			This service will return indicators pair values related to the \
			requested period and scenario.
		`,
			response: dd`
Each record is an array of three items:
- *[0]*: X axis indicator value.
- *[1]*: Y axis indicator value.
- *[2]*: Number of matching grid items.
			`
		},
		object: {
			summary: "Indicators pair values for period and scenario as object",
			description: dd`
			This service will return indicators pair values related to the \
			requested period and scenario.
		`,
			response: dd`
Each record is an object:
- *@X*: X axis indicator value.
- *@Y*: Y axis indicator value.
- *items*: Number of matching grid items
			`
		},
		speciesStats: {
			summary: "Indicators pair statistics for species, period and scenario",
			description: dd`
			This service will return statistics related to the requested \
			indicators pair, species, period and scenario.
		`,
			response: dd`
**Indicator pair statistics**

- *count*: Total number of unique X and Y combinations.
- *@X*: Statistics for the X-axis indicator value: *min* minimum, \
*avg* average and *max* maximum.
- *@Y*: Statistics for the Y-axis indicator value: *min* minimum, \
*avg* average and *max* maximum.
- *items*: Statistics for the number of grid items matching the \
indicators pair value combinations: *min* minimum, *avg* average \
and *max* maximum.
			`
		},
		speciesArray: {
			summary: "Indicators pair values for species, period and scenario as array",
			description: dd`
			This service will return indicators pair values related to the \
			requested species, period and scenario.
		`,
			response: dd`
Each record is an array of three items:
- *[0]*: X axis indicator value.
- *[1]*: Y axis indicator value.
- *[2]*: Number of matching grid items
			`
		},
		speciesObject: {
			summary: "Indicators pair values for species, period and scenario as object",
			description: dd`
			This service will return indicators pair values related to the \
			requested species, period and scenario.
		`,
			response: dd`
Each record is an object:
- *@X*: X axis indicator value.
- *@Y*: Y axis indicator value.
- *items*: Number of matching grid items
			`
		}
	}

module.exports = metadata

'use strict'

/**
 * ModelUnitPairStats.js
 *
 * Model for condervation unit indicator pairs statistics.
 */

const joi = require('joi')

///
// Schema.
///
module.exports =
	joi.object({
		count: joi.number().integer().required(),
		"@X": joi.object({
			min: joi.number(),
			avg: joi.number(),
			max: joi.number()
		}),
		"@Y": joi.object({
			min: joi.number(),
			avg: joi.number(),
			max: joi.number()
		}),
		items: joi.object({
			min: joi.number(),
			avg: joi.number(),
			max: joi.number()
		}),
		properties: {
			chr_AvElevation: joi.number(),
			chr_MinElevation: joi.number(),
			chr_MaxElevation: joi.number(),
			chr_StdElevation: joi.number(),
			chr_AvSlope: joi.number(),
			chr_AvAspect: joi.number(),
			geo_shape_area: joi.number()
		}
	})
		.description(`
**Conservation unit indicator pair statistics**

- *count*: Total number of unique X and Y combinations.
- *@X*: Statistics for the X-axis indicator:
  - *min*: Minimum X-axis indicator value.
  - *avg*: Average X-axis indicator value.
  - *max*: Maximum X-axis indicator value.
- *@Y*: Statistics for the Y-axis indicator:
  - *min*: Minimum Y-axis indicator value.
  - *avg*: Average Y-axis indicator value.
  - *max*: Maximum Y-axis indicator value.
- *items*: Statistics for the number of grid items matching the indicators pair value combinations:
  - *min*: Minimum number of grid items.
  - *avg*: Average number of grid items.
  - *max*: Maximum number of grid items.
- *properties*: Unit geometry topographic statistics:
  - *chr_AvElevation*: Average elevation in meters.
  - *chr_MinElevation*: Minimum elevation in meters.
  - *chr_MaxElevation*: Maximum elevation in meters.
  - *chr_StdElevation*: Elevation standard deviation.
  - *chr_AvSlope*: Average slope angle.
  - *chr_AvAspect*: Average aspect in degrees.
  - *geo_shape_area*: Unit geometry area in square meters.
		`)

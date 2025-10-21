'use strict'

/**
 * ModelPairStats.js
 *
 * Model for indicator pairs statistics.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object({
		count: joi.number().integer().required(),
		"@X": joi.object({
			min: joi.number().required(),
			avg: joi.number().required(),
			max: joi.number().required()
		}),
		"@Y": joi.object({
			min: joi.number().required(),
			avg: joi.number().required(),
			max: joi.number().required()
		}),
		items: joi.object({
			min: joi.number().required(),
			avg: joi.number().required(),
			max: joi.number().required()
		})
	})
		.description(`
**Indicator pair statistics**

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
		`)

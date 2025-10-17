'use strict'

/**
 * ModelPairArray.js
 *
 * Model for indicators pair values as an array:
 * - X axis value.
 * - Y axis value.
 * - Grid matching elements stats.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.array()
		.length(3)
		.items(
			joi.number()
		)
		.required()
		.description(dd`
			**Indicator pair values**
			
			Each record is an array of three items:
			- *[0]*: X axis indicator value.
			- *[1]*: Y axis indicator value.
			- *[2]*: Number of matching grid items
		`)

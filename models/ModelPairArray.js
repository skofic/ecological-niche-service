'use strict'

/**
 * ModelPairArray.js
 *
 * Model for indicators pair values as an array:
 * - X axis value.
 * - Y axis value.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.array()
		.length(2)
		.items(
			joi.number()
		)
		.required()
		.description(dd`
			**Indicator pair values**
			
			Each record is an array of X and Y axis values.
		`)

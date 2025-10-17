'use strict'

/**
 * ModelGridArray.js
 *
 * Model for map grid cells output as an array:
 * - Decimal longitude degrees.
 * - Decimal latitude degrees.
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
			**Map coordinates**
			
			Each record is an array of longitude and latitude.
		`)

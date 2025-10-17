'use strict'

/**
 * ModelPairObject.js
 *
 * Model for indicators pair values as an object:
 * - @X: X axis value.
 * - @Y: Y axis value.
 * - items: Number of matching grid elements.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object()
		.pattern(joi.string().invalid('items'), joi.number())
		.keys({
			items: joi.number().integer().min(1).required()
		})
		.required()
		.description(dd`
			**Indicator pair values**
			
			Each record is an object:
			- *@X*: X axis indicator value.
			- *@Y*: Y axis indicator value.
			- *items*: Number of matching grid items
		`)

'use strict'

/**
 * ModelCountParam.js
 *
 * Model to provide count or data switch:
 * - count: Return data count.
 * - data: return data array.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.string()
		.valid('count', 'data')
		.default('count')
		.required()
		.description(dd`
			Count switch:
			- *count*: Return grid points count.
			- *data*: Return grid cell data.
			Note that *start* and *limit* parameters are ignored with *count*.
		`)

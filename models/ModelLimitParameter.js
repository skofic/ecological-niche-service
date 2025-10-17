'use strict'

/**
 * ModelLimitParameter.js
 *
 * Model to provide query limits records stats parameter.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.number()
		.integer()
		.min(0)         // must be >= 0
		.default(1000)  // defaults to 1000 records
		.required()     // must provide
		.description(dd`
			Number of records per page.
		`)

'use strict'

/**
 * ModelStart.js
 *
 * Model to provide query limits start parameter.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.number()
		.integer()
		.min(0)     // must be >= 0
		.default(0) // defaults to first page
		.required() // must provide
		.description(dd`
			First record page index, zero is the first page.
		`)

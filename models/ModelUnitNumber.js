'use strict'

const joi = require('joi')

///
// Schema.
///
module.exports =
	joi.string()
		.regex(/[A-Z]{3}[0-9]{5}/)
		.required()
		.description("Gene conservation unit number.")

'use strict'

/**
 * ModelSpeciesList.js
 *
 * Model for list of available species.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.array()
		.items(
			joi.string()
		)
		.required()
		.description(dd`
			The list of species is returned as an array.
		`)

'use strict'

/**
 * ModelSpeciesParam.js
 *
 * Model to provide species to service.
 */

const joi = require('joi')

///
// Schema.
///
module.exports =
	joi.string()
		.required()
		.description("Provide genus and species.")

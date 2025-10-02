'use strict'

/**
 * ModelMapCoordinatesJson.js
 *
 * Model for map data output as an object:
 * - lon: Decimal longitude degrees.
 * - lat: Decimal latitude degrees.
 * - value: Species occurrence probability (0-100 float).
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object({
		lon: joi.number().required(),
		lat: joi.number().required(),
		val: joi.number().required()
	})
		.description(dd`
					**Map coordinates**
					
					Each entry is an object with three elements:
					
					- \`lon\`: Longitude in decimal degrees.
					- \`lat\`: Latitude in decimal degrees.
					- \`val\`: Species occurrence probability (0-100).
				`)

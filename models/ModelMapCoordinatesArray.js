'use strict'

/**
 * ModelMapCoordinatesArray.js
 *
 * Model for map data output as an array:
 * - Decimal longitude degrees.
 * - Decimal latitude degrees.
 * - Species occurrence probability (0-100 float).
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.array()
		.length(3)
		.items(
			joi.number().required(),    // Longitude.
			joi.number().required(),    // Latitude.
			joi.number()
				.min(0)
				.max(100)
				.required()
				.description(dd`
					**Map coordinates**
					
					Each entry is an array of three elements:
					
					- \`[0]]\`: Longitude in decimal degrees.
					- \`[1]]\`: Latitude in decimal degrees.
					- \`[2]]\`: Species occurrence probability (0-100).
				`)
		)

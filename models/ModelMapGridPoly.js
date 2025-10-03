'use strict'

/**
 * ModelMapGridPoly.js
 *
 * Model for map grid cells as a GeoJSON polygon.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object({
		geometry: {
			type: 'Polygon',
			coordinates: joi
				.array()
				.items(
					joi.array()
				)
		}
	})
		.required()
		.description(dd`
			**Map point coordinates**
			
			Each record is a GeoJSON point.
		`)

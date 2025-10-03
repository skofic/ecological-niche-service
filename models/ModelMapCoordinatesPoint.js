'use strict'

/**
 * ModelMapCoordinatesPoint.js
 *
 * Model for map data output as a GeoJSON point.
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
				.length(2)
				.items(joi.number())
		}
	})
		.required()
		.description(dd`
			**Map polygon coordinates**
			
			Each record is a GeoJSON polygon.
		`)

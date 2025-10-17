'use strict'

/**
 * ModelGridSpeciesPoint.js
 *
 * Model for species occurrence probability as point and 'value'
 * property ranging from 0 to 100.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object({
		type: 'Feature',
		geometry: joi.object({
			type: 'Point',
			coordinates: joi.array()
				.length(2)
				.items(joi.number())
		}),
		properties: joi.object({
			value: joi
				.number()
				.min(0)
				.max(100)
		})
	})
		.description(dd`
			**Species occurrence probability by point**
			
			Each entry is a GeoJSONL object with its 'value' property \
			corresponding to the species occurrence probability \
			value ranging from 0 to 100.
		`)

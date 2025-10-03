'use strict'

/**
 * ModelMapSpeciesPoly.js
 *
 * Model for species occurrence probability as polygon and 'value'
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
			type: 'Polygon',
			coordinates: joi.array()
				.items(joi.array())
		}),
		properties: joi.object({
			value: joi
				.number()
				.min(0)
				.max(100)
		})
	})
		.description(dd`
			**Species occurrence probability by polygon**
			
			Each entry is a GeoJSONL object with its 'value' property \
			corresponding to the species occurrence probability \
			value ranging from 0 to 100.
		`)

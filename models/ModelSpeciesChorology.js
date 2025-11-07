'use strict'

/**
 * ModelSpeciesChorology.js
 *
 * Model for species distribution geometry.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.object({
		geometry: {
			type: 'Multipolygon',
			coordinates: joi
				.array()
				.items(
					joi.array()
				)
		}
	})
		.required()
		.description(dd`
**Species distribution geometry**

Each record is a GeoJSON multipolygon.
		`)

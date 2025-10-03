'use strict'

/**
 * ModelMapGridCount.js
 *
 * Model for map grid cells count:
 * - Integer count.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.number()
		.integer()
		.description(dd`
			**Map coordinates count**
			
			Returns the count of all map grid points.
		`)

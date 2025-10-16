'use strict'

/**
 * ModelPairCount.js
 *
 * Model for indicator pairs count:
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
			**Indicatora pair count**
			
			Returns the count of existing pairs of indicator values.
		`)

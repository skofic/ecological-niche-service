'use strict'

/**
 * ModelXParam.js
 *
 * Model to provide X-axis indicator.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.string()
		.valid('bio01', 'bio12', 'bio15', 'ci', 'ps', 'pw', 'ts')
		.default('bio01')
		.required()
		.description(dd`
			X-axis indicator:
			- *bio01*: Mean annual air temperature.
			- *bio12*: Annual precipitation amount.
			- *bio15*: Precipitation seasonality.
			- *ci*: Continentality.
			- *ps*: Summer precipitation.
			- *pw*: Winter precipitation.
			- *ts*: Summer temperature.
			This indicator must not match the Y-axis indicator.
		`)

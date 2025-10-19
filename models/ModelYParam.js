'use strict'

/**
 * ModelYParam.js
 *
 * Model to provide Y-axis indicator.
 */

const joi = require('joi')
const dd = require('dedent')
const K = require("../globals.js")

///
// Schema.
///
module.exports =
	joi.string()
		.valid(...K.indicators.grid)
		.default('bio12')
		.required()
		.description(dd`
			Y-axis indicator:
			- *bio01*: Mean annual air temperature.
			- *bio12*: Annual precipitation amount.
			- *bio15*: Precipitation seasonality.
			- *ci*: Continentality.
			- *ps*: Summer precipitation.
			- *pw*: Winter precipitation.
			- *ts*: Summer temperature.
			This indicator must not match the X-axis indicator.
		`)

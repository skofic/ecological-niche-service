'use strict'

/**
 * ModelPairPeriodParam.js
 *
 * Model to provide time period.
 */

const joi = require('joi')
const dd = require('dedent')
const K = require("../globals.js")

///
// Schema.
///
module.exports =
	joi.string()
		.valid(...K.periods.pair)
		.default('1960-1990')
		.required()
		.description(dd`
			Period:
			- *1960-1990*: Current period, centered on 1960 to 1990.
			- *1991-2020*: Future period, centered on 1991 to 2020.
			- *2021-2050*: Future period, centered on 2021 to 2050.
			- *2051-2080*: Future period, centered on 2051 to 2080.
			When selecting future periods you will also need to provide the model scenario.
		`)

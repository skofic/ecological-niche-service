'use strict'

/**
 * ModelScenarioParam.js
 *
 * Model to provide future period scenario.
 */

const joi = require('joi')
const dd = require('dedent')
const K = require("../globals.js")

///
// Schema.
///
module.exports =
	joi.string()
		.valid('-', ...K.scenarios)
		.default('-')
		.required()
		.description(dd`
			Climate model temperature change scenario:
			- *rcp45*: Representative Concentration Pathway 4.5 (RCP 4.5).
			- *rcp85*: Representative Concentration Pathway 8.5 (RCP 8.5).
			When selecting future periods this parameter is required, for current period it is ignored.
		`)

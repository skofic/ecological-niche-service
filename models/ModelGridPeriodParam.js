'use strict'

/**
 * ModelGridPeriodParam.js
 *
 * Model to provide time period.
 */

const joi = require('joi')
const dd = require('dedent')

///
// Schema.
///
module.exports =
	joi.string()
		.valid('cur2005', 'fut2035', 'fut2065', 'fut2095')
		.default('cur2005')
		.required()
		.description(dd`
			Period:
			- *cur2005*: Current period, centered on year 2005.
			- *fut2035*: Future period, centered on year 2035.
			- *fut2065*: Future period, centered on year 2065.
			- *fut2095*: Future period, centered on year 2095.
			When selecting future periods you will also need to provide the model scenario.
		`)

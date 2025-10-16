'use strict'

/**
 * Indicator pairs service metadata.
 *
 * The metadata record contains the descriptions for all services
 * handling indicator pairs data.
 */

///
// Includes.
///
const dd = require('dedent')


///
// Metadata record.
///
const metadata =
	{
		pairCount: {
			summary: "Count of existing indicators pair for all species",
			description: dd`
			This service will return the count of all existing indicator value \
			pairs for proviced period and model scenario.
		`,
			response: dd`
			A single integer with the count.
		`
		},
		pairAll: {
			summary: "Indicators pair values for period and scenario",
			description: dd`
			This service will return all requested and existing indicator \
			pairs for provided period and model scenario.
		`,
			response: dd`
			Each record is an array of two items:
			- *[0]*: X axis indicator value.
			- *[1]*: Y axis indicator value.
		`
		}
	}

module.exports = metadata

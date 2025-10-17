'use strict'

/**
 * Species service metadata.
 *
 * The metadata record contains the descriptions for all services
 * handling species.
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
		list: {
			summary: "List all species",
			description: dd`
			This service will return the list of all available species.
		`,
			response: dd`
The service will return an array with the list of all available species.
			`
		}
	}

module.exports = metadata

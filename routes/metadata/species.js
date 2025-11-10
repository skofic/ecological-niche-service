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
	},
	chorology: {
		summary: "Return species chorology",
			description: dd`
		This service will return the geometry of the species distribution, \
		or an empty object if the species was not found.
		`,
			response: dd`
The service will return a single GeoJSON geometry object.
		`
	}
}

module.exports = metadata

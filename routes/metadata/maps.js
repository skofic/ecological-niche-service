'use strict'

/**
 * Map service metadata.
 * - test: Test service.
 */

const dd = require('dedent')


const metadata = {
	pointArray: {
		summary: "Map coordinates and probability as array",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid points, for the target species, the \
			time period and the eventual future model scenario, as an array \
			of three floating point values: longitude, latitude and occurrence \
			probability in the range from 0 to 100.
		`,
		response: dd`
			Each record is an array of three items:
			- *[0]*: Longitude in decimal degrees.
			- *[1]*: Latitude in decimal degrees.
			- *[2]*: Species occurrence probability as a float with a 0 to 100 range.
		`
	}
}

module.exports = metadata

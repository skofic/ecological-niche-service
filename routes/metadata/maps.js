'use strict'

/**
 * Map service metadata.
 * - test: Test service.
 */

const dd = require('dedent')


const metadata = {
	coordinatesCount: {
		summary: "Map species grid cells count",
		description: dd`
			This service will return the count of all map grid cells that \
			have species occurrence probabilities, regardless of period and \
			future model scenario.
		`,
		response: dd`
			A single integer with the count.
		`
	},
	coordinatesArray: {
		summary: "Map species grid cells as array",
		description: dd`
			This service will return all map grid cell coordinates that have \
			species occurrence probabilities, regardless of period and future \
			model scenario.
		`,
		response: dd`
			Each record is an array of two items:
			- *[0]*: Longitude in decimal degrees.
			- *[1]*: Latitude in decimal degrees.
		`
	},
	coordinatesPoint: {
		summary: "Map species grid cells as GeoJSON points",
		description: dd`
			This service will return all map grid cell points that have \
			species occurrence probabilities, regardless of period and future \
			model scenario.
		`,
		response: dd`
			Each record is a GeoJSON point object.
		`
	},
	coordinatesPoly: {
		summary: "Map species grid cells as GeoJSON polygons",
		description: dd`
			This service will return all map grid cell polygons that have \
			species occurrence probabilities, regardless of period and future \
			model scenario.
		`,
		response: dd`
			Each record is a GeoJSON polygon object.
		`
	},
	speciesCount: {
		summary: "Map species, period and scenario grid cells count",
		description: dd`
			This service will return the count of all map grid cells for \
			a specific species, period and future scenario.
		`,
		response: dd`
			A single integer with the count.
		`
	},
	speciesCoordinatesArray: {
		summary: "Map species, period and scenario occurrence probability as array",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid cell coordinates, for the target \
			species, the time period and the eventual future model scenario, as an array \
			of three floating point values: longitude, latitude and occurrence \
			probability in the range from 0 to 100.
		`,
		response: dd`
			Each record is an array of three items:
			- *[0]*: Longitude in decimal degrees.
			- *[1]*: Latitude in decimal degrees.
			- *[2]*: Species occurrence probability as a float with a 0 to 100 range.
		`
	},
	speciesCoordinatesPoint: {
		summary: "Map species period and scenario occurrence probability as GeoJSON points",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid points, for the target species, the \
			time period and the eventual future model scenario, as a GeoJSON \
			point object with the property 'value' in the range from 0 to 100.
		`,
		response: dd`
			Each record is a GeoJSON point object with its 'value' property \
			corresponding to the species occurrence probability as a float \
			value ranging from 0 to 100.
		`
	},
	speciesCoordinatesPoly: {
		summary: "Map species period and scenario occurrence probability as GeoJSON polygon",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid points, for the target species, the \
			time period and the eventual future model scenario, as a GeoJSON \
			polygon object with the property 'value' in the range from 0 to 100.
		`,
		response: dd`
			Each record is a GeoJSON polygon object with its 'value' property \
			corresponding to the species occurrence probability as a float \
			value ranging from 0 to 100.
		`
	}
}

module.exports = metadata

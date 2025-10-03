'use strict'

/**
 * Map service metadata.
 * - test: Test service.
 */

const dd = require('dedent')


const metadata = {
	coordinatesCount: {
		summary: "Map grid cells count",
		description: dd`
			This service will return the count of all map grid cells.
		`,
		response: dd`
			A single integer with the count.
		`
	},
	coordinatesArray: {
		summary: "Map coordinates as array",
		description: dd`
			This service will return all the grid points as an array \
			of longitude and latitude coordinates.
		`,
		response: dd`
			Each record is an array of two items:
			- *[0]*: Longitude in decimal degrees.
			- *[1]*: Latitude in decimal degrees.
		`
	},
	coordinatesPoint: {
		summary: "Map coordinates as GeoJSON points",
		description: dd`
			This service will return all the grid points as an array \
			of GeoJSON points.
		`,
		response: dd`
			Each record is a GeoJSON point object.
		`
	},
	coordinatesPoly: {
		summary: "Map coordinates as GeoJSON polygon",
		description: dd`
			This service will return all the grid points as an array \
			of GeoJSON polygons.
		`,
		response: dd`
			Each record is a GeoJSON polygon object.
		`
	},
	speciesCoordinatesArray: {
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
	},
	speciesCoordinatesPoint: {
		summary: "Map coordinates and probability as GeoJSONL point",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid points, for the target species, the \
			time period and the eventual future model scenario, as a GeoJSONL \
			point object with the property 'value' in the range from 0 to 100.
		`,
		response: dd`
			Each record is a GeoJSON point object with its 'value' property \
			corresponding to the species occurrence probability as a float \
			value ranging from 0 to 100.
		`
	},
	speciesCoordinatesPoly: {
		summary: "Map coordinates and probability as GeoJSONL polygon",
		description: dd`
			Given a species, a period and a model scenario, this service will \
			return all the available grid points, for the target species, the \
			time period and the eventual future model scenario, as a GeoJSONL \
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

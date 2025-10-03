'use strict'

///
// Includes.
///
const joi = require('joi')
const dd = require('dedent')
const status = require('statuses')
const {db, aql} = require('@arangodb')
const httpError = require('http-errors')
const { errors } = require('@arangodb')
const { context } = require('@arangodb/locals')
const createRouter = require('@arangodb/foxx/router')

///
// ArangoDB includes.
///
const ARANGO_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code
const ARANGO_DUPLICATE = errors.ERROR_ARANGO_UNIQUE_CONSTRAINT_VIOLATED.code
const ARANGO_CONFLICT = errors.ERROR_ARANGO_CONFLICT.code
const HTTP_NOT_FOUND = status('not found')
const HTTP_CONFLICT = status('conflict')

///
// Global includes.
///
const K = require("../globals.js")

///
// Models.
///
const ModelMapGridCount = require('../models/ModelMapGridCount')
const ModelMapGridArray = require('../models/ModelMapGridArray')
const ModelMapGridPoint = require('../models/ModelMapGridPoint')
const ModelMapGridPoly = require('../models/ModelMapGridPoly')

const ModelMapSpeciesCoordinatesArray = require('../models/ModelMapSpeciesArray')
const ModelMapSpeciesCoordinatesPoint = require('../models/ModelMapSpeciesPoint')
const ModelMapSpeciesCoordinatesPoly = require('../models/ModelMapSpeciesPoly')

const ModelScenarioParam = require('../models/ModelScenarioParam')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')
const ModelPeriodParam = require('../models/ModelPeriodParam')

const ModelStart = require("../models/ModelStart");
const ModelLimit = require("../models/ModelLimit");
const ErrorModel = require("../models/error.generic");

///
// Helpers.
///
const helpers = require("../utils/helpers.js")

///
// Queries.
///
const QueryMapGridCount = require('../queries/mapGridCount')
const QueryMapGridArray = require('../queries/mapGridArray')
const QueryMapGridPoint = require('../queries/mapGridPoint')
const QueryMapGridPoly = require('../queries/mapGridPoly')

const QueryMapSpeciesCount = require('../queries/mapSpeciesCount')
const QueryMapSpeciesArray = require('../queries/mapSpeciesArray')
const QueryMapSpeciesPoint = require('../queries/mapSpeciesPoint')
const QueryMapSpeciesPoly = require('../queries/mapSpeciesPoly')


///
// Service metadata.
///
const metadata = require('./metadata/maps')


///
// Create router.
///
const router = createRouter()
module.exports = router

///
// Set tag.
///
router.tag('map')


/******************************************************************************/
/*                                   ROUTES                                   */
/******************************************************************************/

/**
 * Map coordinates count.
 *
 * This service will return the count of all map grid points.
 */
router
	.get(
		'grid/count',
		function (request, response) {
			coordinatesCount(request, response)
		},
		'map-grid-count'
	)
	
	.summary(metadata.coordinatesCount.summary)
	.description(metadata.coordinatesCount.description)
	
	.response(200, ModelMapGridCount, metadata.coordinatesCount.response)

/**
 * Map coordinates as array.
 *
 * This service will return the coordinates for all grid points.
 *
 * The service expects the following parameters:
 * - start: First record index (0 based).
 * - limit: Number of records to return.
 *
 * The service will return each record as the following array:
 * - Longitude in decimal degrees.
 * - Latitude in decimal degrees.
 */
router
	.get(
		'grid/array',
		function (request, response) {
			coordinatesArray(request, response)
		},
		'map-grid-array'
	)
	.summary(metadata.coordinatesArray.summary)
	.description(metadata.coordinatesArray.description)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapGridArray], metadata.coordinatesArray.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map coordinates as points.
 *
 * This service will return the coordinates for all grid cells
 * as GeoJSON points.
 *
 * The service expects the following parameters:
 * - start: First record index (0 based).
 * - limit: Number of records to return.
 *
 * The service will return each record as a GeoJSONL point.
 */
router
	.get(
		'grid/point',
		function (request, response) {
			coordinatesPoint(request, response)
		},
		'map-grid-point'
	)
	.summary(metadata.coordinatesPoint.summary)
	.description(metadata.coordinatesPoint.description)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapGridPoint], metadata.coordinatesPoint.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map coordinates as polygons.
 *
 * This service will return the coordinates for all grid cells
 * as GeoJSON polygons.
 *
 * The service expects the following parameters:
 * - start: First record index (0 based).
 * - limit: Number of records to return.
 *
 * The service will return each record as a GeoJSONL polygon.
 */
router
	.get(
		'grid/poly',
		function (request, response) {
			coordinatesPoly(request, response)
		},
		'map-grid-poly'
	)
	.summary(metadata.coordinatesPoly.summary)
	.description(metadata.coordinatesPoly.description)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapGridPoly], metadata.coordinatesPoly.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map species occurrence probability values count.
 *
 * This service will return the count of all available grid cells
 * for the provided species, period and model scenario.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return tan integer with the records count.
 */
router
	.get(
		'/species/count',
		function (request, response) {
			speciesCount(request, response)
		},
		'map-species-count'
	)
	.summary(metadata.coordinatesCount.summary)
	.description(metadata.coordinatesCount.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.response(200, ModelMapGridCount, metadata.coordinatesCount.response)

/**
 * Map species occurrence probability as array.
 *
 * This service will return one array for each grid coordinate that has a value
 * and grid point, points with missing probabilities will be ignored.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return the following data:
 * - Longitude in decimal degrees.
 * - Latitude in decimal degrees.
 * - Species occurrence probability (0-100).
 */
router
	.get(
		'/species/array',
		function (request, response) {
			speciesArray(request, response)
		},
		'map-species-array'
	)
	.summary(metadata.speciesCoordinatesArray.summary)
	.description(metadata.speciesCoordinatesArray.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapSpeciesCoordinatesArray], metadata.speciesCoordinatesArray.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map species occurrence probability as GeoJSONL point.
 *
 * This service will return a GeoJSONL point object for each grid cell
 * that has a value, grid cells with missing probabilities will be ignored.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return A GeoJSONL object with the cell center point
 * and as property the species occurrence probability as 'value' (0-100).
 */
router
	.get(
		'/species/point',
		function (request, response) {
			speciesPoint(request, response)
		},
		'map-species-point'
	)
	.summary(metadata.speciesCoordinatesPoint.summary)
	.description(metadata.speciesCoordinatesPoint.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapSpeciesCoordinatesPoint], metadata.speciesCoordinatesPoint.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map species occurrence probability as GeoJSONL polygon.
 *
 * This service will return a GeoJSONL polygon object for each grid cell
 * that has a value, grid cells with missing probabilities will be ignored.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return A GeoJSONL object with the cell bounding box
 * and as property the species occurrence probability as 'value' (0-100).
 */
router
	.get(
		'/species/poly',
		function (request, response) {
			speciesPoly(request, response)
		},
		'map-species-poly'
	)
	.summary(metadata.speciesCoordinatesPoly.summary)
	.description(metadata.speciesCoordinatesPoly.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapSpeciesCoordinatesPoly], metadata.speciesCoordinatesPoly.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)


/******************************************************************************/
/*                                 FUNCTIONS                                  */
/******************************************************************************/

/**
 * Return count of all map grid cells.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function coordinatesCount(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapGridCount,
				{
					'@collection': K.collection.name
				}
			).toArray()[0]
		)
	
} // coordinatesCount()

/**
 * Return array of all grid point coordinates.
 *
 * The function expects the @count parameter:
 * - start: 0-based first record index.
 * - limit: Number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function coordinatesArray(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapGridArray,
				{
					'@collection': K.collection.name,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // coordinatesArray()

/**
 * Return array of all grid GeoJson points.
 *
 * The function expects the @count parameter:
 * - start: 0-based first record index.
 * - limit: Number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function coordinatesPoint(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapGridPoint,
				{
					'@collection': K.collection.name,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // coordinatesPoint()

/**
 * Return array of all grid GeoJson polygons.
 *
 * The function expects the following parameters:
 * - start: 0-based first record index.
 * - limit: Number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function coordinatesPoly(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapGridPoly,
				{
					'@collection': K.collection.name,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // coordinatesPoly()

/**
 * Return occurrence probability grid cell count for species,
 * period and model scenario.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesCount(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapSpeciesCount,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'species': request.queryParams.species,
					'scenario': request.queryParams.scenario
				}
			).toArray()[0]
		)
	
} // speciesCount()

/**
 * Return array of coordinates and species occurrence probabilities.
 *
 * The function will first ensure all required parameters have been provided and
 * are correct, then it will query the database and return the result as an array
 * of arrays holding three elements:
 * - Longitude in decimal degrees.
 * - Latitude in decimal degrees.
 * - Species occurrence as a float in the range from 0 to 100.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesArray(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapSpeciesArray,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'species': request.queryParams.species,
					'scenario': request.queryParams.scenario,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // speciesArray()

/**
 * Return GeoJSONL point and species occurrence probabilities.
 *
 * The function will first ensure all required parameters have been provided and
 * are correct, then it will query the database and return the result as an array
 * of GeoJSONL objects with a point geometry and the species occurrence
 * probability.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesPoint(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapSpeciesPoint,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'species': request.queryParams.species,
					'scenario': request.queryParams.scenario,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // speciesPoint()

/**
 * Return GeoJSONL polygon and species occurrence probabilities.
 *
 * The function will first ensure all required parameters have been provided and
 * are correct, then it will query the database and return the result as an array
 * of GeoJSONL objects with a bounding box geometry and the species occurrence
 * probability.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesPoly(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryMapSpeciesPoly,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'species': request.queryParams.species,
					'scenario': request.queryParams.scenario,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // speciesPoly()

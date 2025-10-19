'use strict'

///
// Includes.
///
const dd = require('dedent')
const {db} = require('@arangodb')
const createRouter = require('@arangodb/foxx/router')

///
// Global includes.
///
const K = require("../globals.js")

///
// Models.
///
const ModelStats = require('../models/ModelGridStats')
const ModelArray = require('../models/ModelGridArray')
const ModelPoint = require('../models/ModelGridPoint')

const ModelSpeciesArray = require('../models/ModelGridSpeciesArray')
const ModelSpeciesPoint = require('../models/ModelGridSpeciesPoint')

const ModelPeriodParam = require('../models/ModelGridPeriodParam')
const ModelScenarioParam = require('../models/ModelScenarioParam')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')

const ModelStart = require("../models/ModelStartParameter");
const ModelLimit = require("../models/ModelLimitParameter");

const ErrorModel = require("../models/error.generic");

///
// Helpers.
///
const helpers = require("../utils/helpers.js")

///
// Queries.
///
const QueryStats = require('../queries/gridStats')
const QueryArray = require('../queries/gridArray')
const QueryPoint = require('../queries/gridPoint')

const QuerySpeciesStats = require('../queries/gridSpeciesStats')
const QuerySpeciesArray = require('../queries/gridSpeciesArray')
const QuerySpeciesPoint = require('../queries/gridSpeciesPoint')


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
router.tag('Map')


/******************************************************************************/
/*                                   ROUTES                                   */
/******************************************************************************/

/**
 * Map coordinates stats.
 *
 * This service will return the stats of all map grid points.
 */
router
	.get(
		'stat',
		function (request, response) {
			gridStats(request, response)
		},
		'map-grid-stat'
	)
	
	.summary(metadata.stats.summary)
	.description(metadata.stats.description)
	
	.response(200, ModelStats, metadata.stats.response)

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
		'array',
		function (request, response) {
			coordinatesArray(request, response)
		},
		'map-grid-array'
	)
	.summary(metadata.array.summary)
	.description(metadata.array.description)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelArray], metadata.array.response)
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
		'point',
		function (request, response) {
			coordinatesPoint(request, response)
		},
		'map-grid-point'
	)
	.summary(metadata.point.summary)
	.description(metadata.point.description)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPoint], metadata.point.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map species occurrence probability values stats.
 *
 * This service will return the stats of all available grid cells
 * for the provided species, period and model scenario.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return tan integer with the records stats.
 */
router
	.get(
		'species/stat',
		function (request, response) {
			speciesCount(request, response)
		},
		'map-species-stat'
	)
	.summary(metadata.speciesStats.summary)
	.description(metadata.speciesStats.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.response(200, ModelStats, metadata.speciesStats.response)

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
		'species/array',
		function (request, response) {
			speciesArray(request, response)
		},
		'map-species-array'
	)
	.summary(metadata.speciesArray.summary)
	.description(metadata.speciesArray.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelSpeciesArray], metadata.speciesArray.response)
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
		'species/point',
		function (request, response) {
			speciesPoint(request, response)
		},
		'map-species-point'
	)
	.summary(metadata.speciesPoint.summary)
	.description(metadata.speciesPoint.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelSpeciesPoint], metadata.speciesPoint.response)
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
 * Return stats of all map grid cells.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function gridStats(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryStats,
				{
					'@collection': K.collection.name
				}
			).toArray()[0]
		)
	
} // gridStats()

/**
 * Return array of all grid point coordinates.
 *
 * The function expects the @stats parameter:
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
				QueryArray,
				{
					'@collection': K.collection.name,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // array()

/**
 * Return array of all grid GeoJson points.
 *
 * The function expects the @stats parameter:
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
				QueryPoint,
				{
					'@collection': K.collection.name,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // point()

/**
 * Return occurrence probability grid cell stats for species,
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
	if(! helpers.validateMapPeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QuerySpeciesStats,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'species': request.queryParams.species,
					'scenario': request.queryParams.scenario
				}
			).toArray()[0]
		)
	
} // speciesStats()

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
	if(! helpers.validateMapPeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QuerySpeciesArray,
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
	if(! helpers.validateMapPeriod(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QuerySpeciesPoint,
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

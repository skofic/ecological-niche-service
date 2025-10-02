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
const ModelMapCoordinatesArray = require('../models/ModelMapCoordinatesArray')
const ModelMapCoordinatesJson = require('../models/ModelMapCoordinatesJson')
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
const QueryMapCoordinatesArray = require('../queries/mapCoordinatesArray')
const QueryMapCoordinatesJson = require('../queries/mapCoordinatesJson')


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
 * Map coordinates and probability as array.
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
		'/coordinates/array',
		function (request, response) {
			coordinatesArray(request, response)
		},
		'map-coordinates-array'
	)
	.summary(metadata.coordinatesArray.summary)
	.description(metadata.coordinatesArray.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapCoordinatesArray], metadata.coordinatesArray.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Map coordinates and probability as JSON.
 *
 * This service will return one object for each grid coordinate that has a value
 * and grid point, points with missing probabilities will be ignored.
 *
 * The service expects the following parameters:
 * - species: The requested genus and species.
 * - period:  The period for which we want the probability.
 * - model:   The scenario for future modelled data.
 *
 * The service will return the following object:
 * - lon: Longitude in decimal degrees.
 * - lat: Latitude in decimal degrees.
 * - value: Species occurrence probability (0-100).
 */
router
	.get(
		'/coordinates/json',
		function (request, response) {
			coordinatesJson(request, response)
		},
		'map-coordinates-json'
	)
	.summary(metadata.coordinatesJson.summary)
	.description(metadata.coordinatesJson.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapCoordinatesJson], metadata.coordinatesJson.response)
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
function coordinatesArray(request, response)
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
				QueryMapCoordinatesArray,
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
	
} // coordinatesArray()

/**
 * Return array of coordinates and species occurrence probabilities.
 *
 * The function will first ensure all required parameters have been provided and
 * are correct, then it will query the database and return the result as an array
 * of objects holding three elements:
 * - lon: Longitude in decimal degrees.
 * - lat: Latitude in decimal degrees.
 * - value: Species occurrence as a float in the range from 0 to 100.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function coordinatesJson(request, response)
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
				QueryMapCoordinatesJson,
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
	
} // coordinatesJson()

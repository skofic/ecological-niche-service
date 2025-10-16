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
const ModelPairCount = require('../models/ModelPairCount')
const ModelPairArray = require('../models/ModelPairArray')

const ModelPeriodParam = require('../models/ModelPairPeriodParam')
const ModelScenarioParam = require('../models/ModelScenarioParam')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')

const ModelXParam = require('../models/ModelXParam')
const ModelYParam = require('../models/ModelYParam')

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
const QueryPairsCount = require('../queries/pairAllCount')
const QueryPairsArray = require('../queries/pairAll')
const QueryMapGridPoint = require('../queries/mapGridPoint')

const QueryMapSpeciesCount = require('../queries/mapSpeciesCount')
const QueryMapSpeciesArray = require('../queries/mapSpeciesArray')
const QueryMapSpeciesPoint = require('../queries/mapSpeciesPoint')


///
// Service metadata.
///
const metadata = require('./metadata/pairs')


///
// Create router.
///
const router = createRouter()
module.exports = router

///
// Set tag.
///
router.tag('pair')


/******************************************************************************/
/*                                   ROUTES                                   */
/******************************************************************************/

/**
 * All indicators pair count.
 *
 * This service will return the count of all existing indicators pair
 * values regardless of species.
 *
 * The service expects the following parameters:
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an integer value.
 */
router
	.get(
		'pair/count',
		function (request, response) {
			pairsCount(request, response)
		},
		'pair-all-count'
	)
	
	.summary(metadata.pairCount.summary)
	.description(metadata.pairCount.description)
	
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.response(200, ModelPairCount, metadata.pairCount.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * All indicators pair values as array.
 *
 * This service will return all existing indicators pair
 * values regardless of species, as an array of X and Y values.
 *
 * The service expects the following parameters:
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of of [X, Y] arrays
 * - Longitude in decimal degrees.
 * - Latitude in decimal degrees.
 * - Species occurrence probability (0-100).
 */
router
	.get(
		'pair/array',
		function (request, response) {
			pairsArray(request, response)
		},
		'pair-all-array'
	)
	.summary(metadata.pairAll.summary)
	.description(metadata.pairAll.description)
	
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)

	.response(200, [ModelPairArray], metadata.pairAll.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

// /**
//  * Map coordinates as points.
//  *
//  * This service will return the coordinates for all grid cells
//  * as GeoJSON points.
//  *
//  * The service expects the following parameters:
//  * - start: First record index (0 based).
//  * - limit: Number of records to return.
//  *
//  * The service will return each record as a GeoJSONL point.
//  */
// router
// 	.get(
// 		'grid/point',
// 		function (request, response) {
// 			coordinatesPoint(request, response)
// 		},
// 		'map-grid-point'
// 	)
// 	.summary(metadata.coordinatesPoint.summary)
// 	.description(metadata.coordinatesPoint.description)
//
// 	.queryParam('start', ModelStart)
// 	.queryParam('limit', ModelLimit)
//
// 	.response(200, [ModelMapGridPoint], metadata.coordinatesPoint.response)
// 	.response(400, ErrorModel, dd`
// 		Known and intercepted error:
// 		- *errorNum*: Error number.
// 		- *errorMessage*: Error message.
// 		- *code*: Internal error code.
// 	`)
//
// /**
//  * Map species occurrence probability values count.
//  *
//  * This service will return the count of all available grid cells
//  * for the provided species, period and model scenario.
//  *
//  * The service expects the following parameters:
//  * - species: The requested genus and species.
//  * - period:  The period for which we want the probability.
//  * - model:   The scenario for future modelled data.
//  *
//  * The service will return tan integer with the records count.
//  */
// router
// 	.get(
// 		'/species/count',
// 		function (request, response) {
// 			speciesCount(request, response)
// 		},
// 		'map-species-count'
// 	)
// 	.summary(metadata.speciesCount.summary)
// 	.description(metadata.speciesCount.description)
//
// 	.queryParam('species', ModelSpeciesParam)
// 	.queryParam('period', ModelPeriodParam)
// 	.queryParam('scenario', ModelScenarioParam)
//
// 	.response(200, ModelPairCount, metadata.speciesCount.response)
//
// /**
//  * Map species occurrence probability as array.
//  *
//  * This service will return one array for each grid coordinate that has a value
//  * and grid point, points with missing probabilities will be ignored.
//  *
//  * The service expects the following parameters:
//  * - species: The requested genus and species.
//  * - period:  The period for which we want the probability.
//  * - model:   The scenario for future modelled data.
//  *
//  * The service will return the following data:
//  * - Longitude in decimal degrees.
//  * - Latitude in decimal degrees.
//  * - Species occurrence probability (0-100).
//  */
// router
// 	.get(
// 		'/species/array',
// 		function (request, response) {
// 			speciesArray(request, response)
// 		},
// 		'map-species-array'
// 	)
// 	.summary(metadata.speciesCoordinatesArray.summary)
// 	.description(metadata.speciesCoordinatesArray.description)
//
// 	.queryParam('species', ModelSpeciesParam)
// 	.queryParam('period', ModelPeriodParam)
// 	.queryParam('scenario', ModelScenarioParam)
//
// 	.queryParam('start', ModelStart)
// 	.queryParam('limit', ModelLimit)
//
// 	.response(200, [ModelMapSpeciesCoordinatesArray], metadata.speciesCoordinatesArray.response)
// 	.response(400, ErrorModel, dd`
// 		Known and intercepted error:
// 		- *errorNum*: Error number.
// 		- *errorMessage*: Error message.
// 		- *code*: Internal error code.
// 	`)
//
// /**
//  * Map species occurrence probability as GeoJSONL point.
//  *
//  * This service will return a GeoJSONL point object for each grid cell
//  * that has a value, grid cells with missing probabilities will be ignored.
//  *
//  * The service expects the following parameters:
//  * - species: The requested genus and species.
//  * - period:  The period for which we want the probability.
//  * - model:   The scenario for future modelled data.
//  *
//  * The service will return A GeoJSONL object with the cell center point
//  * and as property the species occurrence probability as 'value' (0-100).
//  */
// router
// 	.get(
// 		'/species/point',
// 		function (request, response) {
// 			speciesPoint(request, response)
// 		},
// 		'map-species-point'
// 	)
// 	.summary(metadata.speciesCoordinatesPoint.summary)
// 	.description(metadata.speciesCoordinatesPoint.description)
//
// 	.queryParam('species', ModelSpeciesParam)
// 	.queryParam('period', ModelPeriodParam)
// 	.queryParam('scenario', ModelScenarioParam)
//
// 	.queryParam('start', ModelStart)
// 	.queryParam('limit', ModelLimit)
//
// 	.response(200, [ModelMapSpeciesCoordinatesPoint], metadata.speciesCoordinatesPoint.response)
// 	.response(400, ErrorModel, dd`
// 		Known and intercepted error:
// 		- *errorNum*: Error number.
// 		- *errorMessage*: Error message.
// 		- *code*: Internal error code.
// 	`)


/******************************************************************************/
/*                                 FUNCTIONS                                  */
/******************************************************************************/

/**
 * Return count of existing indicator pair values regardless of species.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsCount(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePairPeriod(request, response)) {
		return
	}
	
	///
	// Validate indicators.
	///
	if(! helpers.validateIndicatorPairs(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryPairsCount,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					'X': request.queryParams.X,
					'Y': request.queryParams.Y
				}
			).toArray()[0]
		)
	
} // pairsCount()

/**
 * Return array of all existing indicators pair values.
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
function pairsArray(request, response)
{
	///
	// Validate parameters.
	///
	if(! helpers.validatePairPeriod(request, response)) {
		return
	}
	
	///
	// Validate indicators.
	///
	if(! helpers.validateIndicatorPairs(request, response)) {
		return
	}
	
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QueryPairsArray,
				{
					'@collection': K.collection.name,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsArray()

// /**
//  * Return array of all grid GeoJson points.
//  *
//  * The function expects the @count parameter:
//  * - start: 0-based first record index.
//  * - limit: Number of records to return.
//  *
//  * No value is returned by the function, the service response is handled here.
//  *
//  * @param {Object} request: Service request.
//  * @param {Object} response: Service response.
//  */
// function coordinatesPoint(request, response)
// {
// 	///
// 	// Perform query.
// 	///
// 	response
// 		.send(
// 			db._query(
// 				QueryMapGridPoint,
// 				{
// 					'@collection': K.collection.name,
// 					'start': request.queryParams.start,
// 					'limit': request.queryParams.limit
// 				}
// 			).toArray()
// 		)
//
// } // coordinatesPoint()
//
// /**
//  * Return occurrence probability grid cell count for species,
//  * period and model scenario.
//  *
//  * No value is returned by the function, the service response is handled here.
//  *
//  * @param {Object} request: Service request.
//  * @param {Object} response: Service response.
//  */
// function speciesCount(request, response)
// {
// 	///
// 	// Validate parameters.
// 	///
// 	if(! helpers.validatePairPeriod(request, response)) {
// 		return
// 	}
//
// 	///
// 	// Perform query.
// 	///
// 	response
// 		.send(
// 			db._query(
// 				QueryMapSpeciesCount,
// 				{
// 					'@collection': K.collection.name,
// 					'period': request.queryParams.period,
// 					'species': request.queryParams.species,
// 					'scenario': request.queryParams.scenario
// 				}
// 			).toArray()[0]
// 		)
//
// } // speciesCount()
//
// /**
//  * Return array of coordinates and species occurrence probabilities.
//  *
//  * The function will first ensure all required parameters have been provided and
//  * are correct, then it will query the database and return the result as an array
//  * of arrays holding three elements:
//  * - Longitude in decimal degrees.
//  * - Latitude in decimal degrees.
//  * - Species occurrence as a float in the range from 0 to 100.
//  *
//  * No value is returned by the function, the service response is handled here.
//  *
//  * @param {Object} request: Service request.
//  * @param {Object} response: Service response.
//  */
// function speciesArray(request, response)
// {
// 	///
// 	// Validate parameters.
// 	///
// 	if(! helpers.validatePeriod(request, response)) {
// 		return
// 	}
//
// 	///
// 	// Perform query.
// 	///
// 	response
// 		.send(
// 			db._query(
// 				QueryMapSpeciesArray,
// 				{
// 					'@collection': K.collection.name,
// 					'period': request.queryParams.period,
// 					'species': request.queryParams.species,
// 					'scenario': request.queryParams.scenario,
// 					'start': request.queryParams.start,
// 					'limit': request.queryParams.limit
// 				}
// 			).toArray()
// 		)
//
// } // speciesArray()
//
// /**
//  * Return GeoJSONL point and species occurrence probabilities.
//  *
//  * The function will first ensure all required parameters have been provided and
//  * are correct, then it will query the database and return the result as an array
//  * of GeoJSONL objects with a point geometry and the species occurrence
//  * probability.
//  *
//  * No value is returned by the function, the service response is handled here.
//  *
//  * @param {Object} request: Service request.
//  * @param {Object} response: Service response.
//  */
// function speciesPoint(request, response)
// {
// 	///
// 	// Validate parameters.
// 	///
// 	if(! helpers.validatePeriod(request, response)) {
// 		return
// 	}
//
// 	///
// 	// Perform query.
// 	///
// 	response
// 		.send(
// 			db._query(
// 				QueryMapSpeciesPoint,
// 				{
// 					'@collection': K.collection.name,
// 					'period': request.queryParams.period,
// 					'species': request.queryParams.species,
// 					'scenario': request.queryParams.scenario,
// 					'start': request.queryParams.start,
// 					'limit': request.queryParams.limit
// 				}
// 			).toArray()
// 		)
//
// } // speciesPoint()

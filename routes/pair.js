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
const ModelStats = require('../models/ModelPairStats')
const ModelUnitStats = require('../models/ModelUnitPairStats')
const ModelPairArray = require('../models/ModelPairArray')
const ModelPairObject = require('../models/ModelPairObject')

const ModelPeriodParam = require('../models/ModelPairPeriodParam')
const ModelScenarioParam = require('../models/ModelScenarioParam')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')
const ModelUnitParam = require("../models/ModelUnitNumber");

const ModelXParam = require('../models/ModelXParam')
const ModelYParam = require('../models/ModelYParam')

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
const QueryStats = require('../queries/pairStats')
const QueryArray = require('../queries/pairArray')
const QueryObject = require('../queries/pairObject')

const QuerySpeciesStats = require('../queries/pairSpeciesStats')
const QuerySpeciesArray = require('../queries/pairSpeciesArray')
const QuerySpeciesObject = require('../queries/pairSpeciesObject')

const QueryUnitStats = require('../queries/pairUnitStats')
const QueryUnitArray = require('../queries/pairUnitArray')
const QueryUnitObject = require('../queries/pairUnitObject')

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
router.tag('Pairs')


/******************************************************************************/
/*                                   ROUTES                                   */
/******************************************************************************/

/**
 * Indicator pair stats for period and scenario.
 *
 * This service will return the stats of all existing indicators pair
 * values related to the provided period and scenario.
 *
 * The service expects the following parameters:
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an object with the indicators pair statistics:
 * - stats: The total number of unique indicator pair values.
 * - @X: Statistics for the X-axis indicator:
 *   - min: Minimum X-axis value.
 *   - avg: Average X-axis value.
 *   - max: Maximum X-axis value.
 * - @Y: Statistics for the Y-axis indicator:
 *   - min: Minimum Y-axis value.
 *   - avg: Average Y-axis value.
 *   - max: Maximum Y-axis value.
 * - items: Statistics for number of grid matches per pair combination:
 *   - min: Minimum number of grid items per combination.
 *   - avg: Average number of grid items per combination.
 *   - max: Maximum number of grid items per combination.
 */
router
	.get(
		'stat',
		function (request, response) {
			pairsStats(request, response)
		},
		'pair-all-stat'
	)
	
	.summary(metadata.stats.summary)
	.description(metadata.stats.description)
	
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.response(200, ModelStats, metadata.stats.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair value for period and scenario as array.
 *
 * This service will return all existing indicators pair
 * values related to the provided period and scenario,
 * as an array of X, Y and stats values.
 *
 * The service expects the following parameters:
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of three elements:
 * - The X-axis value.
 * - The Y-axis value.
 * - The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'array',
		function (request, response) {
			pairsArray(request, response)
		},
		'pair-all-array'
	)
	.summary(metadata.array.summary)
	.description(metadata.array.description)
	
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairArray], metadata.array.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair value for period and scenario as object.
 *
 * This service will return all existing indicators pair
 * values related to the provided period and scenario,
 * as an object of X, Y and stats values.
 *
 * The service expects the following parameters:
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of objects:
 * - @X: The X-axis value.
 * - @Y: The Y-axis value.
 * - items: The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'object',
		function (request, response) {
			pairsObject(request, response)
		},
		'pair-all-object'
	)
	.summary(metadata.object.summary)
	.description(metadata.object.description)
	
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairObject], metadata.object.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair stats for species, period and scenario.
 *
 * This service will return the stats of indicators pair values
 * related to the requested species, period and scenario.
 *
 * The service expects the following parameters:
 * - species: The genus and species to consider.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an object with the indicators pair statistics:
 * - stats: The total number of unique indicator pair values.
 * - @X: Statistics for the X-axis indicator:
 *   - min: Minimum X-axis value.
 *   - avg: Average X-axis value.
 *   - max: Maximum X-axis value.
 * - @Y: Statistics for the Y-axis indicator:
 *   - min: Minimum Y-axis value.
 *   - avg: Average Y-axis value.
 *   - max: Maximum Y-axis value.
 * - items: Statistics for number of grid matches per pair combination:
 *   - min: Minimum number of grid items per combination.
 *   - avg: Average number of grid items per combination.
 *   - max: Maximum number of grid items per combination.
 */
router
	.get(
		'species/stat',
		function (request, response) {
			pairsSpeciesStats(request, response)
		},
		'pair-species-stat'
	)
	
	.summary(metadata.speciesStats.summary)
	.description(metadata.speciesStats.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.response(200, ModelStats, metadata.speciesStats.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair values for species, period and scenario as array.
 *
 * This service will return all existing indicators pair
 * values related to species, period, scenario and combination of
 * X and Y indicator values as an array of X, Y and items values.
 *
 * The service expects the following parameters:
 * - species: The genus and species to consider.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of three elements:
 * - The X-axis value.
 * - The Y-axis value.
 * - The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'species/array',
		function (request, response) {
			pairsSpeciesArray(request, response)
		},
		'pair-species-array'
	)
	.summary(metadata.speciesArray.summary)
	.description(metadata.speciesArray.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairArray], metadata.speciesArray.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair values for species, period and scenario as object.
 *
 * values related to species, period, scenario and combination of
 * X and Y indicator values as an object of X, Y and items values.
 *
 * The service expects the following parameters:
 * - species: The genus and species to consider.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of objects:
 * - @X: The X-axis value.
 * - @Y: The Y-axis value.
 * - items: The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'species/object',
		function (request, response) {
			pairsSpeciesObject(request, response)
		},
		'pair-species-object'
	)
	.summary(metadata.speciesObject.summary)
	.description(metadata.speciesObject.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairObject], metadata.speciesObject.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair stats for unit, period and scenario.
 *
 * This service will return the stats of indicators pair values
 * related to the requested unit, period and scenario.
 *
 * The service expects the following parameters:
 * - unit: The gene conservation unit number.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an object with the indicators pair statistics:
 * - stats: The total number of unique indicator pair values.
 * - @X: Statistics for the X-axis indicator:
 *   - min: Minimum X-axis value.
 *   - avg: Average X-axis value.
 *   - max: Maximum X-axis value.
 * - @Y: Statistics for the Y-axis indicator:
 *   - min: Minimum Y-axis value.
 *   - avg: Average Y-axis value.
 *   - max: Maximum Y-axis value.
 * - items: Statistics for number of grid matches per pair combination:
 *   - min: Minimum number of grid items per combination.
 *   - avg: Average number of grid items per combination.
 *   - max: Maximum number of grid items per combination.
 */
router
	.get(
		'unit/stat',
		function (request, response) {
			pairsUnitStats(request, response)
		},
		'pair-unit-stat'
	)
	
	.summary(metadata.unitStats.summary)
	.description(metadata.unitStats.description)
	
	.queryParam('unit', ModelUnitParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.response(200, ModelUnitStats, metadata.unitStats.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair values for unit, period and scenario as array.
 *
 * This service will return all existing indicators pair
 * values related to unit, period, scenario and combination of
 * X and Y indicator values as an array of X, Y and items values.
 *
 * The service expects the following parameters:
 * - unit: The gene conservation unit number.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of three elements:
 * - The X-axis value.
 * - The Y-axis value.
 * - The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'unit/array',
		function (request, response) {
			pairsUnitArray(request, response)
		},
		'pair-unit-array'
	)
	.summary(metadata.unitArray.summary)
	.description(metadata.unitArray.description)
	
	.queryParam('unit', ModelUnitParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairArray], metadata.unitArray.response)
	.response(400, ErrorModel, dd`
		Known and intercepted error:
		- *errorNum*: Error number.
		- *errorMessage*: Error message.
		- *code*: Internal error code.
	`)

/**
 * Indicator pair values for unit, period and scenario as object.
 *
 * This service will return all existing indicators pair
 * values related to species, period, scenario and combination of
 * X and Y indicator values as an object of X, Y and items values.
 *
 * The service expects the following parameters:
 * - unit: The gene conservation unit number.
 * - period: The period for which we want the probability.
 * - scenario: The scenario for future modelled data.
 * - X: The X-axis indicator.
 * - Y: The Y-axis indicator.
 *
 * The service will return an array of objects:
 * - @X: The X-axis value.
 * - @Y: The Y-axis value.
 * - items: The number of grid items matching the indicators pair combination.
 */
router
	.get(
		'unit/object',
		function (request, response) {
			pairsUnitObject(request, response)
		},
		'pair-unit-object'
	)
	.summary(metadata.unitObject.summary)
	.description(metadata.unitObject.description)
	
	.queryParam('unit', ModelUnitParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('X', ModelXParam)
	.queryParam('Y', ModelYParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelPairObject], metadata.unitObject.response)
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
 * Return stats of unique indicator pair combination
 * values for provided period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the period, scenario, X-axis
 * and Y-axis indicators.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsStats(request, response)
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
				QueryStats,
				{
					'@collection': K.collections.pair.name,
					
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y
				}
			).toArray()[0]
		)
	
} // pairsStats()

/**
 * Return array of unique indicator pair combination
 * values for provided period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the period, scenario, X-axis
 * and Y-axis indicators, as well as the 0-based first record index
 * and the number of records to return.
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
				QueryArray,
				{
					'@collection': K.collections.pair.name,
					
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

/**
 * Return object of unique indicator pair combination
 * values for provided period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the period, scenario, X-axis
 * and Y-axis indicators, as well as the 0-based first record index
 * and the number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsObject(request, response)
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
				QueryObject,
				{
					'@collection': K.collections.pair.name,
					
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsObject()

/**
 * Return stats of unique indicator pair combination
 * values for provided species, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the period, scenario, X-axis
 * and Y-axis indicators.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsSpeciesStats(request, response)
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
				QuerySpeciesStats,
				{
					'@grid': K.collections.grid.name,
					'@pair': K.collections.pair.name,
					
					'species': request.queryParams.species,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y
				}
			).toArray()[0]
		)
	
} // pairsSpeciesStats()

/**
 * Return array of unique indicator pair combination
 * values for provided species, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the species, period, scenario,
 * X-axis and Y-axis indicators, as well as the 0-based first record
 * index and the number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsSpeciesArray(request, response)
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
				QuerySpeciesArray,
				{
					'@grid': K.collections.grid.name,
					'@pair': K.collections.pair.name,
					
					'species': request.queryParams.species,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsSpeciesArray()

/**
 * Return object of unique indicator pair combination
 * values for provided species, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the species, period, scenario,
 * X-axis and Y-axis indicators, as well as the 0-based first record
 * index and the number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsSpeciesObject(request, response)
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
				QuerySpeciesObject,
				{
					'@grid': K.collections.grid.name,
					'@pair': K.collections.pair.name,
					
					'species': request.queryParams.species,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsSpeciesObject()

/**
 * Return stats of unique indicator pair combination
 * values for provided unit, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the period, scenario, X-axis
 * and Y-axis indicators.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsUnitStats(request, response)
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
				QueryUnitStats,
				{
					'@unitPolygons': K.collections.unit.name,
					'@pair': K.collections.pair.name,
					
					'unit': request.queryParams.unit,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y
				}
			).toArray()[0]
		)
	
} // pairsUnitStats()

/**
 * Return array of unique indicator pair combination
 * values for provided species, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the species, period, scenario,
 * X-axis and Y-axis indicators, as well as the 0-based first record
 * index and the number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsUnitArray(request, response)
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
				QueryUnitArray,
				{
					'@unitPolygons': K.collections.unit.name,
					'@pair': K.collections.pair.name,
					
					'unit': request.queryParams.unit,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsUnitArray()

/**
 * Return object of unique indicator pair combination
 * values for provided species, period and scenario.
 *
 * The function expects the service request and response records.
 * The request is expected to feature the species, period, scenario,
 * X-axis and Y-axis indicators, as well as the 0-based first record
 * index and the number of records to return.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function pairsUnitObject(request, response)
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
				QueryUnitObject,
				{
					'@unitPolygons': K.collections.unit.name,
					'@pair': K.collections.pair.name,
					
					'unit': request.queryParams.unit,
					'period': request.queryParams.period,
					'scenario': request.queryParams.scenario,
					
					'X': request.queryParams.X,
					'Y': request.queryParams.Y,
					
					'start': request.queryParams.start,
					'limit': request.queryParams.limit
				}
			).toArray()
		)
	
} // pairsUnitObject()

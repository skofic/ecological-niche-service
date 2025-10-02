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
const ModelMapPointsArray = require('../models/ModelMapPointsArray')
const ModelScenarioParam = require('../models/ModelScenarioParam')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')
const ModelPeriodParam = require('../models/ModelPeriodParam')

const ModelStart = require("../models/ModelStart");
const ModelLimit = require("../models/ModelLimit");
const ErrorModel = require("../models/error.generic");

///
// Queries.
///
const QueryMapPointsArray = require('../queries/mapPointsArray')


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
		'/point/array',
		function (request, response) {
			pointArray(request, response)
		},
		'map-point-array'
	)
	.summary(metadata.pointArray.summary)
	.description(metadata.pointArray.description)
	
	.queryParam('species', ModelSpeciesParam)
	.queryParam('period', ModelPeriodParam)
	.queryParam('scenario', ModelScenarioParam)
	
	.queryParam('start', ModelStart)
	.queryParam('limit', ModelLimit)
	
	.response(200, [ModelMapPointsArray], metadata.pointArray.response)
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
function pointArray(request, response)
{
	///
	// Parameters.
	///
	const period = request.queryParams.period
	const species = request.queryParams.species
	const scenario = request.queryParams.scenario
	const start = request.queryParams.start
	const limit = request.queryParams.limit
	
	///
	// Validate parameters.
	///
	switch(period) {
		case 'cur2005':
			break
		
		case 'fut2035':
		case 'fut2065':
		case 'fut2095':
			switch(scenario) {
				case 'rcp45':
				case 'rcp85':
					break
				
				default:
					response.status(400)
					response.send({
						errorNum: 2,
						errorMessage: `Invalid scenario (${scenario}), provide 'rcp45' or 'rcp85'.`,
						code: 0
					})
					return
			}
			break
		
		default:
			response.status(400)
			response.send({
				errorNum: 1,
				errorMessage: `Invalid period (${period}), provide 'cur2005', 'fut2035', 'fut2065' or 'fut2095'.`,
				code: 0
			})
			return
	}
	
	///
	// Perform query.
	///
	response
	    .send(
	 		db._query(
	 			QueryMapPointsArray,
	 			{
	 				'@collection': K.collection.name,
	 				'period': period,
	 				'species': species,
	 				'scenario': scenario,
	 				'start': start,
				    'limit': limit
	 			}
	 		).toArray()
	 	)

} // pointArray()
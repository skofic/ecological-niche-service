'use strict'

///
// Includes.
///
const {db} = require('@arangodb')
const createRouter = require('@arangodb/foxx/router')

///
// Global includes.
///
const K = require("../globals.js")

///
// Models.
///
const ModelSpeciesList = require('../models/ModelSpeciesList')
const ModelSpeciesParam = require('../models/ModelSpeciesParam')
const ModelChorology = require('../models/ModelSpeciesChorology')

///
// Queries.
///
const QuerySpeciesList = require('../queries/speciesList')
const QuerySpeciesChorology = require('../queries/speciesChorology')

///
// Service metadata.
///
const metadata = require('./metadata/species')


///
// Create router.
///
const router = createRouter()
module.exports = router

///
// Set tag.
///
router.tag('Species')


/******************************************************************************/
/*                                   ROUTES                                   */
/******************************************************************************/

/**
 * Return list of all available species.
 *
 * This service will return the list of species as an array.
 */
router
	.get(
		'list',
		function (request, response) {
			speciesList(request, response)
		},
		'species-list'
	)
	
	.summary(metadata.list.summary)
	.description(metadata.list.description)
	
	.response(200, ModelSpeciesList, metadata.list.response)

/**
 * Return species chorology as a GeoJSON geometry.
 *
 * This service will return the geometry corresponding to
 * the chorology of the requested species.
 */
router
	.get(
		'chorology',
		function (request, response) {
			speciesChorology(request, response)
		},
		'species-chorology'
	)
	
	.summary(metadata.chorology.summary)
	.description(metadata.chorology.description)
	
	.queryParam('species', ModelSpeciesParam)
	
	.response(200, ModelChorology, metadata.chorology.response)


/******************************************************************************/
/*                                 FUNCTIONS                                  */
/******************************************************************************/

/**
 * Return list of available species.
 *
 * The function expects the service request and response records.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesList(request, response)
{
	///
	// Perform query.
	///
	response
		.send(
			db._query(
				QuerySpeciesList,
				{
					'@collection': K.collections.grid.name
				}
			).toArray()[0]
		)
	
} // speciesList()

/**
 * Return distribution of provided species.
 *
 * The function expects the service request and response records.
 *
 * No value is returned by the function, the service response is handled here.
 *
 * @param {Object} request: Service request.
 * @param {Object} response: Service response.
 */
function speciesChorology(request, response)
{
	///
	// Perform query.
	///
	const result = db._query(
		QuerySpeciesChorology,
		{
			'@collection': K.collections.chorology.name,
			'species': request.queryParams.species
		}
	).toArray()
	
	///
	// Handle result.
	///
	if(result.length === 0) {
		response
			.send({})
	} else {
		response
			.send(result[0])
	}
	
} // speciesChorology()

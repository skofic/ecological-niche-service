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
const ModelSpecies = require('../models/ModelSpeciesList')

///
// Queries.
///
const QuerySpecies = require('../queries/speciesList')

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
router.tag('species')


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
	
	.response(200, ModelSpecies, metadata.list.response)


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
				QuerySpecies,
				{
					'@collection': K.collection.name
				}
			).toArray()[0]
		)
	
} // speciesList()

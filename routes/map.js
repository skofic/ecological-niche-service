'use strict'

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


///
// Helpers.
///
const helpers = require("../utils/helpers.js")

///
// Create router.
///
const router = createRouter()
module.exports = router
router.tag('data')


/**
 * ROUTES
 */

/**
 * Grid data.
 */
router
	.get(
		'/grid',
		function (request, response) {
			response.send({ test: "prova" })
		},
		'grid'
	)
	.summary('Get grid data')
	.description(dd`
**Get grid pair data**.

Grid data represents the climate combination of the two indicators, \
it is the base layer of the scatter-plot. This layer shows what is the \
climate combination for the selected pair for the region of interest.

Provide the pair key, to select the pair of indicators, and the type, \
to select either the full resolution or rounded data for the grid. \
There are a set of flags that determine what data is returned and in \
what format. Provide the start and limit parameters to select the \
records range.
	`)
	
	.response()

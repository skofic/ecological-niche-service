'use strict'

/**
 * helpers.js
 *
 * A set of helper functions.
 */

///
// Globals.
///
const {db, aql} = require('@arangodb')
const K = require("../globals.js")


/**
 * validateMapPeriod
 *
 * This function will validate the provided map period parameter,
 * if the parameter is correct, the function will return true,
 * if the parameter is incorrect, the function will return false
 * after sending the error record in the response.
 *
 * @param request {Object}: Service request.
 * @param response {Object}: Service response.
 *
 * @return {Boolean}: true means correct, false means error.
 */
function validateMapPeriod(request, response)
{
	///
	// Get parameters.
	///
	const period = request.queryParams.period
	const scenario = request.queryParams.scenario
	
	///
	// Parse period.
	///
	switch(period) {
		case 'cur2005':
			break
		
		case 'fut2035':
		case 'fut2065':
		case 'fut2095':
			///
			// Parse scenario.
			///
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
					return false
			}
			break
		
		default:
			response.status(400)
			response.send({
				errorNum: 1,
				errorMessage: `Invalid period (${period}), provide 'cur2005', 'fut2035', 'fut2065' or 'fut2095'.`,
				code: 0
			})
			return false
	}
	
	return true
	
} // validateMapPeriod()

/**
 * validatePairPeriod
 *
 * This function will validate the provided pair period parameter,
 * if the parameter is correct, the function will return true,
 * if the parameter is incorrect, the function will return false
 * after sending the error record in the response.
 *
 * @param request {Object}: Service request.
 * @param response {Object}: Service response.
 *
 * @return {Boolean}: true means correct, false means error.
 */
function validatePairPeriod(request, response)
{
	///
	// Get parameters.
	///
	const period = request.queryParams.period
	const scenario = request.queryParams.scenario
	
	///
	// Parse period.
	///
	switch(period) {
		case '1960-1990':
			break
		
		case '1991-2020':
		case '2021-2050':
		case '2051-2080':
			///
			// Parse scenario.
			///
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
					return false
			}
			break
		
		default:
			response.status(400)
			response.send({
				errorNum: 1,
				errorMessage: `Invalid period (${period}), provide '1960-1990', '1991-2020', '2021-2050' or '2051-2080'.`,
				code: 0
			})
			return false
	}
	
	return true
	
} // validatePairPeriod()

/**
 * validateIndicatorPairs
 *
 * This function will ensure X and Y axis indicators are different.
 *
 * @param request {Object}: Service request.
 * @param response {Object}: Service response.
 *
 * @return {Boolean}: true means correct, false means error.
 */
function validateIndicatorPairs(request, response)
{
	///
	// Get parameters.
	///
	const X = request.queryParams.X
	const Y = request.queryParams.Y
	
	///
	// Parse indicators pair.
	///
	if(X === Y) {
		response.status(400)
		response.send({
			errorNum: 3,
			errorMessage: `X-axis indicator must be different than Y-axis indicator.`,
			code: 0
		})
		return false
	}
	
	return true
	
} // validateIndicatorPairs()


module.exports = {
	validateMapPeriod,
	validatePairPeriod,
	validateIndicatorPairs
}

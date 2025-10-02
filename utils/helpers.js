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
 * validatePeriodScenario
 *
 * This function will validate the provided period parameter,
 * if the parameter is correct, the function will return true,
 * if the parameter is incorrect, the function will return false
 * after sending the error record in the response.
 *
 * @param theDomain {String}: Which data to return (omit to have all).
 *
 * @return {Boolean}: true means correct, false means error.
 */
function validatePeriodScenario(request, response)
{
	///
	// Get parameters.
	///
	const period = request.queryParams.period
	const scenario = request.queryParams.scenario

	///
	// Handle species.
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
	
} // validatePeriodScenario()


module.exports = {
	validatePeriod: validatePeriodScenario
}

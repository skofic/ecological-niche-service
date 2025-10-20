'use strict'

/**
 * globals.js
 *
 * This file contains the global variables used in the project.
 */

///
// Globals.
///
module.exports = Object.freeze({
	
	///
	// Collections.
	///
	"collections": {
		"grid": {
			"name": module.context.configuration.collectionGrid,
			"index": [
				{
					"name": "idx_species",
					"type": "persistent",
					"fields": ["properties.species[*]"],
					"cache": false,
					"deduplicate": false,
					"sparse": true,
					"unique": false
				}
			],
			"view": []
		},
		"pair": {
			"name": module.context.configuration.collectionPair,
			"index": [
				{
					"name": "idx_geometry",
					"type": "geo",
					"geoJson": true,
					"fields": ["geometry"],
					"cache": false,
					"deduplicate": false,
					"sparse": true,
					"unique": false
				}
			],
			"view": []
		},
		"unit": {
			"name": module.context.configuration.collectionUnitShapes,
			"index": [],
			"view": []
		}
	},
	
	///
	// Grid resolution diameter in degrees.
	///
	"resolution": module.context.configuration.resolution,
	
	///
	// Periods.
	///
	"periods": {
		///
		// Probability periods.
		///
		"grid": [
			"cur2005",
			"fut2035",
			"fut2065",
			"fut2095"
		],
		///
		// Indicator pair periods.
		///
		"pair": [
			"1960-1990",
			"1991-2020",
			"2021-2050",
			"2051-2080"
		]
	},
	
	///
	// Future forecast scenarios.
	///
	"scenarios": [
		"rcp45",        // RCP4.5
		"rcp85"         // RCP8.5
	],
	
	///
	// Indicator names.
	///
	"indicators": {
		///
		// Grid indicators.
		///
		"grid": [
			"bio01",    // Mean annual air temperature.
			"bio12",    // Annual precipitation amount.
			"bio15",    // Precipitation seasonality.
			"ci",       // Continentality.
			"ps",       // Summer precipitation.
			"pw",       // Winter precipitation.
			"ts"        // Summer temperature.
		],
		///
		// GCU indicators.
		///
		"gcu": {
			"bio01": "env_climate_bio01",
			"bio12": "env_climate_bio12",
			"bio15": "env_climate_bio15"
		}
	}
	
})

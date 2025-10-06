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
	"collection": {
		"name": module.context.configuration.collection,
		"index": [
			{
				"name": "idx_species",
				"type": "persistent",
				"fields": ["properties.species[*]"],
				"cache": false,
				"deduplicate": false,
				"sparse": true,
				"unique": false
			},
			{
				"name": "idx_geometry",
				"type": "geo",
				"fields": ["geometry"],
				"sparse": true,
				"unique": false
			}
		],
		"view": []
	},
	
	///
	// Grid resolution diameter in degrees.
	///
	"resolution": module.context.configuration.resolution
	
})

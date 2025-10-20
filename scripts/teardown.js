'use strict'

///
// Includes.
///
const { db } = require('@arangodb')

///
// Local includes.
///
const K = require("../globals")

///
// Operation results log.
///
const results = []

///
// Iterate collections.
///
Object.values(K.collections).forEach(record => {
	///
	// Collection name.
	///
	const collectionName = record.name
	
	///
	// Drop views.
	///
	record.view.forEach((view) => {
		if (db._view(view.name) === null) {
			results.push(`${view.name} does not exist.`)
		} else {
			console.debug(`Dropping view ${view.name}.`)
			db._dropView(view.name)
			results.push(`Dropped view ${view.name}.`)
		}
	})
	
	///
	// Drop collection.
	///
	if(!db._collection(collectionName)) {
		results.push(`Collection ${collectionName} does not exist.`)
	} else {
		console.debug(`Dropping collection ${collectionName}.`)
		db._drop(collectionName)
		results.push(`Dropped collection ${collectionName}.`)
	}
})


module.exports = results

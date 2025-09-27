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
// Collection name.
///
const collectionName = K.collection.name

///
// Drop views.
///
K.collection.view.forEach((view) => {
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

module.exports = results

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
	// Create collection.
	///
	if(!db._collection(collectionName)) {
		console.debug(`Creating document collection ${collectionName}.`)
		db._createDocumentCollection(collectionName)
		results.push(`Created document collection ${collectionName}.`)
	} else {
		results.push(`Using existing document collection ${collectionName}.`)
	}
	
	///
	// Reference collection.
	///
	const collection = db._collection(collectionName)
	
	///
	// Create indexes.
	///
	const indexes = collection.getIndexes().map(index => index.name)
	record.index.forEach((index) => {
		if(!indexes.includes(index.name)) {
			console.debug(`Ensuring index ${index.name} for collection ${collectionName}.`)
			collection.ensureIndex(index)
			results.push(`Created index ${index.name} for collection ${collectionName}.`)
		} else {
			results.push(`Using existing index ${index.name} from collection ${collectionName}.`)
		}
	})
	
	///
	// Create views.
	///
	record.view.forEach((view) => {
		if (db._view(view.name) === null) {
			console.debug(`Ensuring view ${view.name}.`)
			db._createView(view.name, view.type, view.properties)
			results.push(`Created view ${view.name}.`)
		} else {
			results.push(`Using existing view ${view.name}.`)
		}
	})
})

module.exports = results

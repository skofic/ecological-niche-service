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
K.collection.index.forEach((index) => {
	if(!indexes.includes(index.name)) {
		console.debug(`Ensuring index ${index.name} for collection ${collectionName}.`)
		collection.ensureIndex({
			name: index.name,
			type: index.type,
			fields: index.fields,
			cacheEnabled: index.cache,
			deduplicate: index.deduplicate,
			sparse: index.sparse,
			unique: index.unique
		})
		results.push(`Created index ${index.name} for collection ${collectionName}.`)
	} else {
		results.push(`Using existing index ${index.name} from collection ${collectionName}.`)
	}
})

///
// Create views.
///
K.collection.view.forEach((view) => {
	if (db._view(view.name) === null) {
		console.debug(`Ensuring view ${view.name}.`)
		db._createView(view.name, view.type, view.properties)
		results.push(`Created view ${view.name}.`)
	} else {
		results.push(`Using existing view ${view.name}.`)
	}
})

module.exports = results

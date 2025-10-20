'use strict'

///
// Includes.
///
const { context } = require('@arangodb/locals')

///
// Deploy paths.
///
context.use('/species', require('./routes/species'), 'species')
context.use('/map', require('./routes/map'), 'map')
context.use('/pair', require('./routes/pair'), 'pair')
context.use('/unit', require('./routes/unit'), 'unit')

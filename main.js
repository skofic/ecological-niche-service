'use strict'

///
// Includes.
///
const { context } = require('@arangodb/locals')

///
// Deploy paths.
///
context.use('/map', require('./routes/map'), 'map')

// context.use('/info', require('./routes/info'), 'info')
// context.use('/data', require('./routes/data'), 'data')

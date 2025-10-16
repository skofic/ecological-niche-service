'use strict'

///
// Includes.
///
const { context } = require('@arangodb/locals')

///
// Deploy paths.
///
context.use('/map', require('./routes/map'), 'map')
context.use('/pair', require('./routes/pair'), 'pair')

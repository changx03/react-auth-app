const { Pool } = require('pg')

// We don't need multiple pools
//
// You generally want a limited number of these in your application and usually just 1.
// Creating an unbounded number of pools defeats the purpose of pooling at all.
const pgPool = new Pool()

pgPool.on('error', err => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pgPool

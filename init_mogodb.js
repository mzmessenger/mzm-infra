#!/usr/bin/env node
const { MongoClient } = require('mongodb')

/**
 * ./init_mogodb.js --password=example --user=xxx --user_password=yyy --port=27018
 */

const { execSync } = require('child_process')
const { password, user, user_password, port } = require('yargs')
  .option('password', {
    describe: 'root password',
    demandOption: true
  })
  .option('user', {
    describe: 'db user',
    demandOption: true
  })
  .option('user_password', {
    describe: 'db user password',
    demandOption: true
  })
  .option('port', {
    describe: 'db port',
    demandOption: true,
    default: '27017'
  }).argv

const createUser = async (client, dbname) => {
  try {
    await client.db(dbname).removeUser(user)
  } catch (e) {}

  await client.db(dbname).addUser(user, user_password, {
    roles: ['readWrite']
  })
}

const main = async () => {
  const client = await MongoClient.connect(
    `mongodb://root:${password}@localhost?authenticationDatabase="admin"`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  await createUser(client, 'mzm')
  await createUser(client, 'auth')

  // index
  await client
    .db('mzm')
    .collection('rooms')
    .createIndex({ name: 1 }, { unique: true })

  await client.db('mzm').collection('enter').createIndex({ userId: 1 })

  await client
    .db('mzm')
    .collection('users')
    .createIndex({ account: 1 }, { unique: true })

  client.close()
}

main().catch(console.error)

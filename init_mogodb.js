#!/usr/bin/env node

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

function createMongoShell(dbname) {
  return `mongo ${dbname} --port '${port}' -uroot -p ${password} --authenticationDatabase="admin"`
}

function createUser(dbname) {
  let existUser = true
  const mongoShell = createMongoShell(dbname)
  try {
    execSync(`${mongoShell} --eval 'db.getUsers()' | grep user | grep ${user}`)
  } catch (e) {
    if (e.stderr.toString() === '') {
      existUser = false
    }
  }

  try {
    if (!existUser) {
      execSync(
        `${mongoShell} --eval 'db.createUser({ user: "${user}", pwd: "${user_password}", roles: [] })'`
      )
    }
    execSync(
      `${mongoShell} --eval 'db.grantRolesToUser("${user}", ["readWrite"])'`
    )
  } catch (e) {
    console.error(`${e.toString()}\n\n${e.stdout.toString()}`)
  }
}

createUser('mzm')
createUser('auth')

const mzmShell = createMongoShell('mzm')
// index
execSync(
  `${mzmShell} --eval 'db.rooms.createIndex({ name: 1 }, { unique: true })'`
)
execSync(`${mzmShell} --eval 'db.enter.createIndex({ userId: 1 })'`)
execSync(
  `${mzmShell} --eval 'db.users.createIndex({ account: 1 }, { unique: true })'`
)

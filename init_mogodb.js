#!/usr/bin/env node

/**
 * ./init_mogodb.js --password=example --user=xxx --user_password=yyy
 */

const { execSync } = require('child_process')
const { password, user, user_password } = require('yargs')
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
  }).argv

createUser('mzm')
createUser('auth')

function createUser(dbname) {
  let existUser = true
  try {
    execSync(
      `mongo ${dbname} -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.getUsers()' | grep user | grep ${user}`
    )
  } catch (e) {
    if (e.stderr.toString() === '') {
      existUser = false
    }
  }

  try {
    if (!existUser) {
      execSync(
        `mongo ${dbname} -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.createUser({ user: "${user}", pwd: "${user_password}", roles: [] })'`
      )
    }
    execSync(
      `mongo ${dbname} -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.grantRolesToUser("${user}", ["readWrite"])'`
    )
  } catch (e) {
    console.error(`${e.toString()}\n\n${e.stdout.toString()}`)
  }
}

// index
execSync(
  `mongo mzm -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.rooms.createIndex({ name: 1 }, { unique: true })'`
)
execSync(
  `mongo mzm -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.enter.createIndex({ userId: 1 })'`
)
execSync(
  `mongo mzm -uroot -p ${password} --authenticationDatabase="admin" --eval 'db.users.createIndex({ account: 1 })'`
)

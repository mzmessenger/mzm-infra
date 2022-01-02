# mzm-infra

## Get started

start middleware

```bash
# infra
$ docker-compose up

# init db
$ npm install
$ ./init_mogodb.js --password=example --user=mzm --user_password={{password}} --port=27018
```

start components

[frontend](https://github.com/koh110/mzm-frontend)

[backend](https://github.com/koh110/mzm-backend)

[socket](https://github.com/koh110/mzm-socket)

[auth](https://github.com/koh110/mzm-auth)

```bash
# start frontend
$ cd mzm-frontend && npm start

# start backend
$ cd mzm-backend && npm start

# start socket
$ cd mzm-socket && npm start

# start auth
$ cd mzm-auth && npm start
```

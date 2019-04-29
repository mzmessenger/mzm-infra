# mzm-infra

[frontend](https://github.com/koh110/mzm-frontend)
[backend](https://github.com/koh110/mzm-backend)
[socket](https://github.com/koh110/mzm-socket)
[auth](https://github.com/koh110/mzm-auth)

Get started

```bash
# start frontend
cd mzm-frontend && npm start

# start backend
cd mzm-backend && npm start

# start socket
cd mzm-socket && npm start

# start auth
cd mzm-auth && npm start

# infra
$ export HOST_IP=`ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'` && docker-compose up
```

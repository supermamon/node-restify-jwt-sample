# node-restify-jwt-sample

A sample api service with JWT authentication

## What's Inside

* route path prefix
* versioned routes
* protected/unprotected routes
* admin/non-admin routes
* logging (using winston)
* unit tests

## Configure

See `/config/index.js`

## Sample 

Use `newtoken.js` to generate tokens

```sh
$ export JWT=`node newtoken.js '{ "name": "Johnny Appleseed", "isAdmin": true }'`
$ echo $JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obm55IEFwcGxlc2VlZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUwNTQwMTk5Nn0.Egj7FOP4Zddc1fGRS_v6xoRqNqeZxbtB7n_VopVQuJ4

$ export JWTR=`node newtoken.js '{ "name": "Tim Cook", "isAdmin": false }'`
$ echo $JWTR
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIENvb2siLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTA1NDAyNTYxfQ.D5X-WvMVTfx7oh3RAnnm-lKFLGGiIFV-5FWmz9X7Hfg
```

Route protection 

```sh
$ curl localhost:8080/api/ping
{"ping":"OK"}

$ curl localhost:8080/api/home
{"code":"InvalidCredentials","message":"No authorization token was found"}
```

Protected route

```sh
$ curl -H "Authorization: Bearer $JWT" localhost:8080/api/home
{"welcome":"Johnny Appleseed"}

$ curl -H "Authorization: Bearer $JWTR" localhost:8080/api/home
{"welcome":"Tim Cook"}
```

Admin route

```sh
$ curl -H "Authorization: Bearer $JWT" localhost:8080/api/admin
{"action":"completed"}

$ curl -H "Authorization: Bearer $JWTR" localhost:8080/api/admin
{"code":"Forbidden","message":"You don't have sufficient priviledges."}
```
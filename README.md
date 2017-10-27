# node-restify-jwt-sample

A sample api service with JWT authentication

## What's Inside

* route path prefix
* versioned routes
* protected/unprotected routes
* registration
* admin/non-admin routes
* logging (using winston)
* unit tests

## Configure

See `/config/index.js`

## Examples

Use `api/register` to generate tokens.

```sh
$ curl -X POST \
> -H "Content-Type: application/json" \
> --data '{ "name": "Johnny Appleseed", "role": "test" }' \
http://localhost:8080/api/register

{"name":"Johnny Appleseed","role":"test","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obm55IEFwcGxlc2VlZCIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNTA5MDc2MTEwfQ.EsRsidT33amgeDX8u6SlE6LwWUs2jpyblogOvLaJ1Y8"}

$ curl -X POST \
> -H "Content-Type: application/json" \
> --data '{ "name": "Tim Cook", "role": "admin" }' \
http://localhost:8080/api/register

{"name":"Tim Cook","role":"admin","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIENvb2siLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDkwNzY0NzB9.f5_v9HfOAiOS4IiiQ5Pj0IxLOMJGWUhHQ57Zd9opqwE"}

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
$ curl -H "Authorization: Bearer your-token" localhost:8080/api/home
{"welcome":"Johnny Appleseed"}

```

Admin route

```sh
$ curl -H "Authorization: Bearer admin-token" localhost:8080/api/admin
{"action":"completed"}

$ curl -H "Authorization: Bearer user-token" localhost:8080/api/admin
{"code":"Forbidden","message":"You don't have sufficient priviledges."}
```
# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "kukuh",
  "email": "kukuh@gmail.com",
  "password": "kukuh123"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "kukuh",
    "email": "kukuh@gmail.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "email is not vaild format"
}
```


## Login User API

Endpoint : POST /api/login

Request Body :

```json
{
  "email" : "kukuh@gmail.com",
  "passwword": "kukuh123"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique string"
  }
}
```

Response Body Error :

```json
{
  "errors": "email or password is wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body : 

```json
{
  "username": "new username", //optional
  "email": "new email", //optional
  "password": "new password" // optional
  "isVerified": true, //optional
  "isAdmin": true //optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "kukuh",
    "email": "kukuh@gmail.com"
  }
}
```

## Get User API

Endpoint : GET /api/me

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "kukuh",
    "email": "kukuh@gmail.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

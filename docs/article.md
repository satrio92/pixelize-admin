# Article API Spec

## Add Article

Endpoint : POST /api/articles/

Headers :
- Authorization : token

Request Body :

```json
{
  "title": "Cara Cepat Menjadi Sukses",
  "content": "ini content",
  "thumbnail": "ini link gambar",
  "author": "objectId(user_id)"
}
```

Response Body Success :

```json
{
  "data": {
    "title": "Cara Cepat Menjadi Sukses",
    "content": "ini content",
    "thumbnail": "ini link gambar",
    "author": "objectId(user_id)"
  }
}
```

Response Body Error :

```json
{
  "errors": "title field cannot empty"
}
```

## Update Article

Endpoint : PATCH /api/articles/update/current

Headers :
- Authorization : token

Request Body :

```json
{
  "title": "Cara Cepat Menjadi Sukses", //optional
  "content": "ini content", //optional
  "thumbnail": "ini link gambar", //optional
  "author": "objectId(user_id)" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "title": "Cara Cepat Menjadi Sukses",
    "content": "ini content",
    "thumbnail": "ini link gambar",
    "author": "objectId(user_id)"
  }
}
```

Response Body Error :

```json
{
  "errors": ""
}
```

## Get Article

Endpoint : GET /api/articles/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "title": "Cara Cepat Menjadi Sukses",
    "content": "ini content",
    "thumbnail": "ini link gambar",
    "author": "objectId(user_id)"
  }
}
```

Response Body Error :

```json
{
  "errors": "article not found"
}
```

## Get List Article

Endpoint : GET /api/articles/

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "title": "Cara Cepat Menjadi Sukses",
      "content": "ini content",
      "thumbnail": "ini link gambar",
      "author": "objectId(user_id)"
    },
    {
      "title": "Cara Cepat Menjadi Sukses",
      "content": "ini content",
      "thumbnail": "ini link gambar",
      "author": "objectId(user_id)"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Remove Article

Endpoint : DELETE /api/articles/:id

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
  "errors": "article not found"
}
```
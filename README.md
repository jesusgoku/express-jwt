# Express + JWT

Secure API with JWT token.

## Endpoints

### Home (Public)

`GET /`

### Time (Protected)

`GET /time`

#### Request

##### Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiamVzdXNnb2t1IiwiaWF0IjoxNTQyMzQwMTY0LCJleHAiOjE1NDIzNTA5NjR9.q7IXiBAA9FxP4FqXhBBwWOike_tsBCZSht6ldhnQZyg
```

#### Response

```
{
  "time": "07:10:09",
  "user": {
    "username": "jesusgoku"
  }
}
```


### Login

`POST /login`

#### Request

##### Header

```
Content-Type: application/json
```

##### Body

```json
{
  "username": "jesusgoku",
  "password": "jesusgoku"
}
```

#### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiamVzdXNnb2t1IiwiaWF0IjoxNTQyMzQwMTY0LCJleHAiOjE1NDIzNTA5NjR9.q7IXiBAA9FxP4FqXhBBwWOike_tsBCZSht6ldhnQZyg"
}
```

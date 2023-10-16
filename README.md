## Description

Use NODE v18.16.0
AmazonIA Ateliware - API Rest build with NestJS.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# First: migrate dev database with sqlite (mysql is used on prod)
$ npx prisma migrate dev

# watch mode
$ npm run start:dev

# prisma
$ npx prisma studio
```

## Test

```bash
# unit tests
$ npm run test

```

## Swagger

When uploading the application, Swagger will be available at:

```
  localhost:8080/api
```

## Documentation

#### Create User

```
  POST /user
```

##### Request

```json
{
	"username": "user",
	"name": "Fulano",
	"password": "123@Pass"
}
```

| Parameter    | Type      |                                 |
|:-------------|:----------|:-----------------------------------------|
| `username` | `string`  | *Required* |
| `name`      | `string`  | *Required* |
| `password`   | `string` | *Required* |

##### Response

```json
{
	"id": 1,
	"username": "user",
	"name": "Fulano"
}
```

---
---

#### Auth Login

```
  POST /auth/login
```

##### Request

```json
{
	"username": "user",
	"password": "123@Pass"
}
```

| Parameter    | Type      |                                 |
|:-------------|:----------|:-----------------------------------------|
| `username` | `string`  | *Required* |
| `name`      | `string`  | *Required* |

##### Response

```json
{
	"access_token": "eyJhbG[...]"
}
```

---
---

#### Create Route

```
  POST /route
```

##### Request

```json
{
	"origin": "A1",
	"packageCollection": "H1",
	"destination": "A3"
}
```

| Parameter    | Type      |                                 |
|:-------------|:----------|:-----------------------------------------|
| `origin` | `string`  | *Required* |
| `packageCollection`      | `string`  | *Required* |
| `destination`      | `string`  | *Required* |

##### Response

```json
{
	"statusCode": 201,
	"success": true,
	"data": {
		"id": 1,
		"origin": "A1",
		"destination": "A3",
		"timeRoute": 286.89,
		"packageCollection": "H1",
		"dateCreated": "16/10/2023 22:35",
		"routePaths": {
			"origin": [
				"A1",
				"B1",
				"C1",
				"D1",
				"E1",
				"F1",
				"G1",
				"H1"
			],
			"destination": [
				"H1",
				"G1",
				"F1",
				"E1",
				"E2",
				"D2",
				"C2",
				"C3",
				"B3",
				"A3"
			]
		}
	}
}
```
---
---

#### Get Route

```
  GET /route
```

##### Response

```json
{
	"statusCode": 200,
	"success": true,
	"data": [
		{
			"id": 1,
			"origin": "A1",
			"destination": "A3",
			"packageCollection": "H1",
			"timeRoute": 286.89,
			"dateCreated": "16/10/2023 22:35",
			"routePaths": {
				"origin": [
					"A1",
					"B1",
					"C1",
					"D1",
					"E1",
					"F1",
					"G1",
					"H1"
				],
				"destination": [
					"H1",
					"G1",
					"F1",
					"E1",
					"E2",
					"D2",
					"C2",
					"C3",
					"B3",
					"A3"
				]
			}
		}
	]
}
```

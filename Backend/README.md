# User Registration Endpoint

## Endpoint: `/users/register`

### Method: POST

### Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database.

### Request Body
The request body should be a JSON object with the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.
- `contact` (number, required): The contact number of the user. Must be at least 10 characters long.

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
    "password": "password123",
    "contact": 1234567890
}
```

### Responses

#### Success
- **Status Code: 201 Created**
- **Response Body:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "contact": 1234567890,
      "orders": [],
      "cart": [],
      "isadmin": false
    }
  }
  ```

#### Validation Errors
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be atleast 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

### Example Error Response
```json
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

# User Login Endpoint

## Endpoint: `/users/login`

### Method: POST

### Description
This endpoint is used to log in an existing user. It validates the input data and checks the credentials against the database.

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "contact": 1234567890,
      "orders": [],
      "cart": [],
      "isadmin": false
    }
  }
  ```

#### Validation Errors
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Invalid Credentials
- **Status Code: 401 Unauthorized**
- **Response Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Example Error Response
```json
{
  "message": "Invalid email or password"
}
```

# User Profile Endpoint

## Endpoint: `/users/profile`

### Method: GET

### Description
This endpoint is used to get the profile of the currently authenticated user.

### Responses

#### Success
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "contact": 1234567890,
    "orders": [],
    "cart": [],
    "isadmin": false
  }
  ```

#### Unauthorized
- **Status Code: 401 Unauthorized**
- **Response Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Error Response
```json
{
  "message": "Unauthorized"
}
```

# User Logout Endpoint

## Endpoint: `/users/logout`

### Method: GET

### Description
This endpoint is used to log out the currently authenticated user. It clears the authentication token and adds it to the blacklist.

### Responses

#### Success
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Unauthorized
- **Status Code: 401 Unauthorized**
- **Response Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Error Response
```json
{
  "message": "Unauthorized"
}
```

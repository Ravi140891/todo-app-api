Introduction
The TODO API is a RESTful API that allows users to create, update and delete tasks and categories. This API provides an interface for managing tasks and categories for a user.

Technologies
The API is built with Node.js, and the Hapi.js framework is used to handle server creation and routing. The API uses PostgreSQL as the database management system and the Knex.js library as the SQL query builder. The Objection.js library is used as the ORM (Object-Relational Mapping) for database access. The JWT (JSON Web Tokens) authentication scheme is used to authenticate user requests.

Requirements
Node.js version 14.0 or higher installed
PostgreSQL database installed and running
.env file with the following variables:
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
JWT_SECRET
PORT (optional)
HOST (optional)

Usage
The API has the following endpoints:

User Management
POST /signup: Creates a new user account.
POST /login: Authenticates a user and returns a JWT token.
Category Management
GET /categories: Returns a list of all categories.
POST /categories: Creates a new category.
PUT /categories/{id}: Updates a category by ID.
DELETE /categories/{id}: Deletes a category by ID.
Task Management
GET /categories/{categoryid}/tasks: Returns a list of tasks for a given category.
GET /tasks/{id}: Returns a task by ID.
POST /tasks: Creates a new task.
PUT /tasks/{id}: Updates a task by ID.
DELETE /tasks/{id}: Deletes a task by ID.
Authentication
JWT tokens are required to access the protected endpoints. The token should be included in the Authorization header of each request with the format Bearer {token}.

Example Requests
Signup
POST /signup
Content-Type: application/json

{
"username": "user1",
"password": "password1"
}

Login

POST /login
Content-Type: application/json

{
"username": "user1",
"password": "password1"
}

Create Category

POST /categories
Authorization: Bearer {token}
Content-Type: application/json

{
"name": "Work"
}

Update Category

PUT /categories/1
Authorization: Bearer {token}
Content-Type: application/json

{
"name": "Personal"
}

Delete Category

DELETE /categories/1
Authorization: Bearer {token}

Create Task

POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
"name": "Task 1",
"categoryId": 1
}

Update Task

PUT /tasks/1
Authorization: Bearer {token}
Content-Type: application/json

{
"name": "Task 1 Updated",
"completed": true
}

Delete Task

DELETE /tasks/1
Authorization: Bearer {token}

{
"message": "Task deleted successfully"
}

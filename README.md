# BuyerForesight Backend Assignment

## Video Link

https://drive.google.com/file/d/1eGNv5FT40ksFdYkGaZ_FBKvpOXdszvnC/view?usp=sharing

## Setup
npm init -y

npm install express uuid

npm install

npm start

## API Endpoints

GET /users      => curl -X POST http://localhost:3000/users

GET /users/:id      => curl -X POST http://localhost:3000/users/id

POST /users      => curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Lokesh\",\"email\":\"lokesh@gmail.com\",\"age\":25}"

PUT /users/:id      => curl -X PUT http://localhost:3000/users/id -H "Content-Type: application/json" -d "{\"name\":\"rahul\",\"age\":26}"

DELETE /users/:id      => curl -X DELETE http://localhost:3000/users/USER_ID

## Features

- Search users
- Sort users
- JSON file storage

# Authentication Web App
Authentication App with JWT Token and Password Hashing

## Purpose
This project is a web application that allows users to register, log in, and update their details. It uses JWT (JSON Web Token) for authentication and password hashing using the crypto library for security. The backend is built with Node.js and Express.js, while the frontend is developed using React.js. The application is Dockerized for easy deployment.

## Installation
1) Clone the repository:```git@github.com:Harmeet135/login-system.git```
2) Navigate to the project directory: `cd login-system`
3) Build the Docker image:`docker build -t authentication-app` and run it at `docker run -p 8000:8000 authentication-app`

#Backend 

1) Create a MongoDB database and obtain the connection URI.
2) Create a .env file in the root directory of the backend with following environment variables `DB_URI=<your-mongodb-connection-uri> 
JWT_SECRET=<your-jwt-secret-key>`.
3) Install the backend dependencies:`cd backend ` then `npm install` and start the app with `npm start`.

   The backend server will run on http://localhost:8000.

#Frontend

1) Install the frontend dependencies:`cd frontend ` then `npm install`
2) Start the frontend development server:`npm start`

    The React development server will run on http://localhost:3000.

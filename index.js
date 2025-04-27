const express = require('express');
const dotenv = require('dotenv');
const connection = require('./connection.js');  // Adjust path as needed
const userRoutes = require('./Routes/users');  // Adjust path to point to your route file
const messageRoutes = require('./Routes/messages.js')
const cors = require('cors');
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;

// Initialize database connection
connection();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin : 'http://localhost:3000',
  credentials:true
};

app.use(cors(corsOption))

// Routes
app.use(userRoutes);  // Register user routes
app.use(messageRoutes);

// Start the server
app.listen(8080, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port 8080`);
  }
});

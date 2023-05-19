import express from 'express';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoute';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB

// .connect(process.env.MONGODB_URI, {})
mongoose
  .connect('mongodb+srv://learn_mongo:learn_mongo@todoapp.rrb6pyx.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => {
    console.log('Connected to the DB');
  })
  .catch((err) => {
    console.log(err);
    console.log('Error Connecting to the DB');
  });

// Create Express app
const app = express();

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Default route
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to todo-server!' });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use('/', todoRoutes);

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);

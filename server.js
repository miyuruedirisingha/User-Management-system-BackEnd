require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const host = process.env.HOST || '127.0.0.1';
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://miyuru2001:ashi%40678@miyuru.qz4gnar.mongodb.net/?appName=miyuru';
 

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

connect();


const server = app.listen(3001,'127.0.0.1', () => {
  console.log('Server is running on http://127.0.0.1:3001');
});

app.use('/api' , router);

module.exports = app;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
 mongoose.connect('mongodb+srv://m001-student:m001-student@sandbox.etcmq.mongodb.net/?retryWrites=true&w=majority');
const connection  = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo DB connected successfully');
})

const userRoutes = require('./routes/users');
const excerciseRoutes = require('./routes/exercise');

app.use('/users',userRoutes);
app.use('/excercise',excerciseRoutes);
app.listen(port , () => {
    console.log('server is running at port ' + port);
})
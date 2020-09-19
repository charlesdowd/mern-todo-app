const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;


mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Mixing it up on Port: " + PORT);
});
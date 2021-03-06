const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router()
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function () {
    console.log("Mixing it up on Port: " + PORT);
});

todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log('error getting all todo items', err)
        }
        else {
            res.json(todos)
        }
    })
})

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id
    Todo.findById(id, function (err, todo) {
        if (err) {
            console.log(`error getting todo with id ${id}`, err)
        }
        else {
            res.json(todo)
        }
    })
})

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body)
    todo.save()
        .then(todo => {
            res.status(200).json({ todo: 'todo added successfully!' })
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

todoRoutes.route('/update/:id').post(function (req, res) {
    let id = req.params.id
    Todo.findById(id, function (err, todo) {
        if (!todo) {
            res.status(404).send("data is not found")
        }
        else {
            todo.todo_description = req.body.todo_description
            todo.todo_responsible = req.body.todo_responsible
            todo.todo_priority = req.body.todo_priority
            todo.todo_completed = req.body.todo_completed

            todo.save()
                .then(todo => {
                    res.json('Todo updated!')
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        }
    })
})

// findByIdAndRemove is deprecated so look into other options... still works for now
todoRoutes.route('/delete/:id').delete(function (req, res) {
    let id = req.params.id
    Todo.findByIdAndRemove(id, function(err, todo) {
        if (err) {
            res.status(400).send('could not delete todo ', err)
        }
        else {
            res.json(`todo with id ${todo.id} successfully deleted`)
        }
    })
})
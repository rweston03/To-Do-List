const router = require('express').Router();
let ToDo = require('../models/todo.model');

router.route('/').get((req, res) => {
    ToDo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    ToDo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const todo = req.body.todo;
    const status = "pending";

    const newToDo = new ToDo({todo, status});

    newToDo.save()
        .then(() => res.json('To-Do added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    ToDo.findById(req.params.id)
        .then( todo => {
            todo.todo = req.body.todo;
            todo.status = req.body.status;

            todo.save()
                .then(() => res.json('To-Do updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    ToDo.findByIdAndDelete(req.params.id)
        .then(() => res.json('To-Do deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
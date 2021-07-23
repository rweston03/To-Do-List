import { ToDo } from '../models/todo.model'
import { User } from '../models/user'

// GET /api/:id
export const allTodosAPI = (req, res, next) => {
    ToDo.findAll({username: req.app.locals.username}).exec((err, todos) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(todos))
            res.end()
        }
    })
}

// GET /api/todos/:id
export const oneTodoAPI = (req, res, next) => {
    ToDo.find({_id: req.params.id}).exec((err, todo) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(todo))
            res.end()
        }
    })
}

// POST /api/todos
export const createTodoAPI = (req, res, next) => {
    let todo = new ToDo(req.body)
    todo.created = new Date()
    todo.updated = new Date()
    todo.username = new User(getCurrentUser(req))
    todo.todo = req.body.todo
    todo.status = "pending"
    todo.save()
        .then(() => res.json('To-Do added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

// PUT /api/todos/:id
export const updateTodoAPI = (req, res, next) => {
    ToDo.findOne({_id: req.params.id}).exec((err, todo) => {
        if (err) {
            res.json({success: false, message: "Unable to update"})
            res.end()
        } else {
            Object.assign(todo, req.body)
            todo.updated = new Date()
            todo.save()
                .then(() => res.json('To-Do added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    })
}

// DELETE /api/todos/:id
export const deleteTodoAPI = (req, res, next) => {
    ToDo.findOne({_id: req.params.id}).exec((err, todo) => {
        if (err) {
            res.json({success: false, message: "Unable to delete"})
            res.end()
        } else {
            ToDo.findByIdAndDelete(req.params.id, err => {
                if (err) {
                    res.json({success: false, message: "Unable to delete to-do"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: { 
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

export let ToDo = mongoose.model('ToDo', todoSchema);
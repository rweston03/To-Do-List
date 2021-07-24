const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
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

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
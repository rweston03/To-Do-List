const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb+srv://dbAdmin:SEHiDLVqftwPo4ai@cluster0.qg8rr.mongodb.net/To-Do-List?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongodB database connection established successfully.");
})

const todosRouter = require('./routes/todos');

app.use('/todos', todosRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')

import { create } from 'domain'
import { connect } from './config/db/connect'
connect(process.env.MONGODB_URI)

require('dotenv').config();

export const app = express();
const port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client', 'public')))

// Authentication
import passport from 'passport'
import { strategy } from './config/passport'
passport.use(strategy)
app.use(passport.initialize())

// Routing
import { configureRoutes } from './config/routes'
configureRoutes(app)

// Handling errors
app.use(function(req, res, next) {
    res.render('layout', { content: 'error', err: createError(404), title: "To-Do List"})
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('layout', { content: 'error', err: err, title: "To-Do List"})
})

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Create the web server
let http = require('http')
let server = http.createServer(app)
server.listen(port)
server.on('error', err => {
    throw err
})

server.on('listening', () => {
    let address = server.address()
    let bind = typeof address === 'string' ? address : address.port
    console.log("Listening on " + bind)
})
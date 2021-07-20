import express from 'express'

import { indexPage, signInPage, registerPage } from '../controllers/index'
import { allTodosAPI, oneTodoAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from '../controllers/todos'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'

let router = express.Router()

export function getCurrentUser(req){
  if(req.cookies.token){
    return jwt.decode(req.cookies.token, APP_SECRET) 
  }else {
    return null
  }
}

function isSignedIn(req) {
    try {
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    } catch (err) {
        return false
    }
}

function requireSignIn(req, res, next) {
    if(isSignedIn(req)) {
        next()
    } else {
        res.status(401)
        res.end()
    }
}

export function configureRoutes(app) {
    app.all('*', (req, res, next)=>{
      app.locals.signedIn = isSignedIn(req)
      app.locals.currentUser = getCurrentUser(req)
      next()
    })
   
   router.get('/', indexPage)
   router.get('/signin', signInPage)
   router.get('/register', registerPage)
   
   
   router.get('/todos*', indexPage)
   router.get('/register', indexPage)
   router.get('/signin', indexPage)

   // Todos API Endpoints
   router.get('/api/todos', requireSignIn, allTodosAPI)
   router.post('/api/todos', requireSignIn, createTodoAPI)
   router.get('/api/todos/:tid', requireSignIn, oneTodoAPI)
   router.put('/api/todos/:tid', requireSignIn, updateTodoAPI)
   router.delete('/api/todos/:tid', requireSignIn, deleteTodoAPI)

   // Users
   router.post('/api/users/register', registerUserAPI)
   router.post('/api/users/signin', signUserInAPI)

   app.use('/', router)
}
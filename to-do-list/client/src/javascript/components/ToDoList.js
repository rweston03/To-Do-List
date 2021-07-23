import React, { createContext, useState, useEffect } from 'react'
import { useHistory, Route, Switch, Redirect } from 'react-router-dom'
import  ToDo  from './ToDo'
import  ToDoForm  from './ToDoForm'
import { ErrorNotFound } from './Pages'
import { useCookies } from 'react-cookie'
import { FaPlus } from "react-icons/fa";

export const ToDoContext = createContext()

export default function ToDoList() {
  const [ todos, setTodos] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory();


  if(!authenticated)
  {
    loginDisplay = {
      display: "none"
    }
  }

  useEffect(() => {
    if (!todos) {
      fetch('/api/todos', {
        credentials: 'same-origin'
      })
        .then(response => response.text())
        .then((data) => {
          setTodos(JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
            if(typeof value === 'string' && dateFormat.test(value))
            {
              return new Date(value)
            }
            return value
          }))
        })
        .catch(console.error)
    }
  })
  
  if(!todos)
    return <button className="btn btn-success mx-2 my-2" style={ loginDisplay } onClick={() => history.push('/todos/new')}><FaPlus/> To-Do</button>
  return (
    <>
    <ToDoContext.Provider value={{todos, setTodos, authenticated, setAuthenticated}}>
      <main className="container d-flex flex-wrap justify-content-around">
        <Switch>
          <Route exact path="/todos">
          <div className="container d-flex justify-content-end mt-5">
            <button className="btn btn-success mx-2 my-2" style={ loginDisplay } onClick={() => history.push('/todos/new')}><FaPlus/> To-Do</button>
          </div>
          <div className="container d-flex justify-content-center mt-5">
            {todos.map((m, i) => {
              return <ToDo key={i} tid={t.id} todo={t}/>
            })}
          </div>
          </Route>
          <Route exact path="/todos/:tid/edit"><ToDoForm/></Route>
          <Route exact path="/todos/new"><ToDoForm/></Route>
          <Route path="/todos/:tid"><ToDo/></Route>
          <Redirect from="" to="/todos"/>
          <Route path="*"><ErrorNotFound/></Route>
        </Switch>
      </main>
    </ToDoContext.Provider>
    </>
  );
}
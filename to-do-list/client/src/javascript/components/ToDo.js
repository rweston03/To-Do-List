import React, { createContext, useContext, useState, useEffect } from 'react'
import {format} from 'date-fns'
import { Link, Switch, useHistory, useParams, Route, Redirect } from 'react-router-dom'
import { ToDoContext } from './ToDoList'
import ToDoForm from './ToDoForm'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import 'react-toastify/dist/ReactToastify.css'
import { FaPlus } from "react-icons/fa"

toast.configure()

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function ToDo() {
  let { todo, setTodos, authenticated, setAuthenticated } = useContext(ToDoContext);
  let [modalOpen, setModalOpen] = useState(false);
  const [ todoID, setTodoID ] = useState();
  let tid = useParams();
  let todo = ""
  const history = useHistory();

  for(let i = 0; i < todos.length; i++)
  {
    if (todos[i].id.toString() == tid.tid.toString())
    {
      todo = todos[i]
    }
  }

  useEffect(() => {
    setTodoID(tid.tid)
  })

  if(!authenticated)
  {
    loginDisplay = {
      display: "none"
    }
  }

  const deleteTodo = () => {
    fetch(`/api/todos/${tid.tid}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    }).then(() => {
        toast('Successfully deleted', {
            onClose: () => {
                document.location = "/todos"
            }
        })

        setModalOpen(false)
    }).catch((error) => {
        toast('Failed to delete', {
            onClose: () => {
                document.location = "/todos"
            }
        })
    })
  }

  return(
    <>
    <TIDContext.Provider value={{todoID, setTodoID}}>
    <div className="card col-10 mx-3 mt-5">
      <div className="card-body text-center">
        <h1 className="card-title text-capitalize">{ todo.todo}</h1>
        <p className="card-text">{ todo.status }</p>
        <div className="row">
          <div className="col-12 justify-content-center text-center">
            <button className="btn btn-warning mx-2" style={ loginDisplay } onClick={() => history.push({pathname: `/todos/${todo.id}/edit`,
                                                                                                state: { todo: todo } })}>Edit To-Do</button>
            <button className="btn btn-danger mx-2" style={ loginDisplay } onClick={() => {
                  if(authenticated) setModalOpen(true)
                  else document.location = '/signin'
               }}>Delete To-Do</button>
            <button type="button" className="btn btn-info mx-2" onClick={()=> history.push(`/todos/`) }>Back to To-Do List</button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)}
          style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to delete {todo.todo}?</p>
        <button className="btn btn-danger mx-2" onClick={deleteTodo}>Confirm Delete</button>
        <button className="btn btn-warning mx-2" onClick={() => setModalOpen(false)}>Cancel</button>
      </Modal>  
    </div>
    </TIDContext.Provider>
    </>
  );
}
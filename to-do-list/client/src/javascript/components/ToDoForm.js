import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ToDoContext } from './ToDoList'

toast.configure()

export function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
  todo: yup.string().required(),
  status: yup.string().required()
})

export default function MenuForm() {
  let { todos, setTodos, authenticated, setAuthenticated } = useContext(ToDoContext)
  let { tid } = useParams()
  const history = useHistory()
  const location = useLocation()
  
  if(!authenticated)
  {
    document.location = '/signin'
    return <></>
  }

  let todo = tid ? todos.find(t => t.id == tid ) : {}
  let is_new = mid === undefined

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      username: app.locals.currentUser.username,
      todo: "",
      status: ""
    } : {...todo}, 
    validationSchema,
    onSubmit(values){
      fetch(`/api/todos${is_new ? '' : '/' + tid}`, {
          method: is_new ? "POST" : "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'same-origin',
          body: JSON.stringify(values)
      }).then(() => {
          toast('Successfully submitted', {
              onClose: () => {
                  document.location = "/todos"
              }
          })
      }).catch((error) => {
          toast('Failed to submit', {
              onClose: () => {
                  document.location = "/todos"
              }
          })
      })
  }
  })

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h1>{ is_new ? 'Create a To-do' : 'Edit a To-do' }</h1>
        <div className="field mb-3">
          <label htmlFor="todo" className="form-label">To-Do</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.todo ? 'is-invalid' : ''}`} type="text" id="todo" name="todo" value={values.todo} onChange={handleChange} />
            <VHelp message={errors.todo}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <div className="input-group has-validation">
            <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} id="status" value={values.status} onChange={handleChange}>
            <option>pending</option>
            <option>complete</option>
            </select>
            <VHelp message={errors.status}/>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={()=> history.push(`/todos`)}>Cancel</button>
        </div>
      </form >
    </>
  )
}
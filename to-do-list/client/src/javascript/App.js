import './App.css';
import React from 'react'
import ToDoList from './components/ToDoList'
import Index from './components/Index'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main () {
  return (
    <Router>
        <ToDoList/>
    </Router>
  );
}
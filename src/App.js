import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar.component"
import TodoList from "./components/TodoList.component"
import TodoEdit from "./components/TodoEdit.component"
import TodoAdd from "./components/TodoAdd.component"

function App() {
  return (
    <Router>
      <div className="container-fluid px-0">
        <Navbar />
        <br />
        <div className="container">
          <Route path="/" exact component = { TodoList } />
          <Route path="/add" exact component = { TodoAdd } />
          <Route path="/edit/:id" exact component = { TodoEdit } />
        </div>
      </div>
    </Router>
  );
}

export default App;

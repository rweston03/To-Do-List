import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <div className="card d-flex flex-row align-items-center p-3">
        <div className="col-10">
            <h4>{ props.todo.todo }</h4>
            <p>{ props.todo.status }</p>
        </div>
        <div className="col-2 d-flex flex-row align-items-end">
            <Link className="btn btn-warning" to={"/edit/"+props.todo._id}>edit</Link>  <a href="#" className="btn btn-danger mx-3" onClick={() => { props.deleteTodo(props.todo._id)}}>delete</a>
        </div>
    </div>
)

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.deleteTodo = this.deleteTodo.bind(this);
        this.resetSort = this.resetSort.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('https://rw-todo-list.herokuapp.com/todos/')
            .then(response => {
                this.setState({ todos: response.data })
                this.setState({ alltodos: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    resetSort()
    {
        this.setState({
            todos: this.state.alltodos
        })
    }

    onChangeSort(e) {
        if(e.target.value == "none")
        {
            this.resetSort()
        }
        if(e.target.value == "pending") {
            this.resetSort()
            this.setState({
                todos: this.state.todos.filter(todo => todo.status == e.target.value)
            })
        }
        if(e.target.value == "completed") {
            this.resetSort()
            this.setState({
                todos: this.state.todos.filter(todo => todo.status == e.target.value)
            })
        }
    }

    deleteTodo(id) {
        axios.delete('https://rw-todo-list.herokuapp.com/todos/'+id)
            .then(res => console.log(res.data));
        this.setState({
            todos: this.state.todos.filter(el => el._id !== id)
        })
    }

    todoList() {
        return this.state.todos.map(currentTodo => {
            return <Todo todo={ currentTodo } deleteTodo={this.deleteTodo} key={currentTodo._id} />;
        })
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-5 mb-3">To-Do List</h1>
                <div className="form-group mb-5 d-flex flex-row align-items-center justify-content-center">
                    <div>
                        <label className="mx-2">Sort By: </label>
                    </div>
                    <div>
                        <select required className="form-control" value={this.state.sort} onChange={this.onChangeSort}>
                            <option value="none">none</option>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>
                        </select>
                    </div>
                </div>
                <div className="mx-auto w-75">
                    { this.todoList() }
                </div>
                <Link to="/add" className="btn btn-primary mt-5">Add To-Do</Link>
            </div>
        )
    }
}
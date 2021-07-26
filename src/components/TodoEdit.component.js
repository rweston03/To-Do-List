import React, { Component } from 'react';
import axios from 'axios';

export default class TodoEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo: '',
            status: ''
        }
    }

    componentDidMount() {
        axios.get('https://rw-todo-list.herokuapp.com/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo: response.data.todo,
                    status: response.data.status
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodo(e) {
        this.setState({
            todo: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const todo = {
            todo: this.state.todo,
            status: this.state.status
        }

        console.log(todo);

        axios.post('https://rw-todo-list.herokuapp.com/edit/'+this.props.match.params.id, todo)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h1 className="my-3 text-center">Edit To-Do</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-2">
                        <div>
                            <label>To-Do: </label>
                        </div>
                        <div>
                            <input type="text" required className="form-control" value={this.state.todo} onChange={this.onChangeTodo}/>
                        </div>
                    </div>
                    <div className="form-group mb-2">
                        <div>
                            <label>Status: </label>
                        </div>
                        <div>
                            <select required className="form-control" value={this.state.status} onChange={this.onChangeStatus}>
                                <option value="pending">pending</option>
                                <option value="completed">completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit To-Do" className="btn btn-primary mt-5" />
                    </div>
                </form>
            </div>
        )
    }
}
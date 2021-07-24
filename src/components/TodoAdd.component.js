import React, { Component } from 'react';
import axios from 'axios';

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo: '',
            status: ''
        }
    }

    componentDidMount() {
        this.setState({
            status: "pending"
        })
    }

    onChangeTodo(e) {
        this.setState({
            todo: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const todo = {
            todo: this.state.todo,
            status: this.state.status
        }

        console.log(todo);

        axios.post('/api/todos/add', todo)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h1 className="my-3 text-center">Add a New To-Do</h1>
                <form onSubmit={this.onSubmit} className="d-flex align-items-end justify-content-end">
                    <div className="col-9 form-group">
                        <div>
                            <label>To-Do: </label>
                        </div>
                        <div>
                            <input type="text" required className="form-control" value={this.state.todo} onChange={this.onChangeTodo}/>
                        </div>
                    </div>
                    <div className="col-3 form-group">
                        <input type="submit" value="Add To-Do" className="btn btn-primary mx-2" />
                    </div>
                </form>
            </div>
        )
    }
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap';
import App from './App';
import App from './components/App'
import SignInForm from './components/SignInForm';
import Register from './components/Register';
import SignOut from './components/SignOut';

if(document.getElementById('main')){
  ReactDOM.render(<App/>, document.getElementById('main'))
} else if (document.getElementById('register')){
    ReactDOM.render(<Register/>, document.getElementById('register'))
} else if (document.getElementById('signin')){
    ReactDOM.render(<SignInForm/>, document.getElementById('signin'))
}

if(document.querySelector('#_sign_user_out')) {
    document.querySelector('#_sign_user_out').onclick = (e) => {
        let el = document.createElement('div')
        document.body.appendChild(el)
        ReactDOM.render(<SignOut/>, el)
    }
}
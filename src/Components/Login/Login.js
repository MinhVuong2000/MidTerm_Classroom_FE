import signin_image from '../../static/images/signin-image.jpeg';
import '../Login/Login.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleSubmit(event) {
        console.log(`${username}`);
        console.log(`${password}`);
        event.preventDefault();
        if (username !== '' && password !== '') {

            const url = DOMAIN_API + "users/login";
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    localStorage.setItem('access_token', result.access_token);
                })
                .catch(error => console.log('Form submit error', error))
        }
        else {
            window.alert("Username and Password must not empty!");
        }

    }
    return (
        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Classroom</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/register"}>Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
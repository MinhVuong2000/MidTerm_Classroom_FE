import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Register extends Component {
    render() {
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

                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>User name</label>
                                <input type="text" className="form-control" placeholder="User name" />
                            </div>

                            <div className="form-group">
                                <label>Full name</label>
                                <input type="text" className="form-control" placeholder="Full name" />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered <a href="#">sign in?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
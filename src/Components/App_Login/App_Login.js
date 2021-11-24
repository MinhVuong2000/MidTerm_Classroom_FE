import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App_Login.css';

//import {  Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes ,Route, Link } from 'react-router-dom';

// import Login from "./components/login.component";
// import SignUp from "./components/signup.component";
import Login from '../Login/Login';
import SignUp from '../Register/Register';

function App_Login() {
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
          <Routes>
            <Route exact path='/login' element={Login} />
            <Route path="/login" element={Login} />
            <Route path="/register" element={SignUp} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App_Login;

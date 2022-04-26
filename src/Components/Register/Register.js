import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navigate} from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import { useState, useEffect } from "react";

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [mssv, setMSSV] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [canLogin, setCanLogin] = useState(false);
    const [isEnoughInforRegister, setIsEnoughInforRegister] = useState(false);

    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeFullname(event) {
        setFullname(event.target.value)
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleChangeAddress(event) {
        setAddress(event.target.value)
    }
    function handleChangeMSSV(event) {
        setMSSV(event.target.value)
    }
    function handleChangePhone(event) {
        setPhone(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        fetch(DOMAIN_API+`is-available`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, mssv })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result);
                if(result == true){
                    if (username !== '' && password !== '' && mssv !=='' && email!=='' && fullname!=='') {
                        const url = DOMAIN_API + "register";
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username, password, fullname, mssv, phone, email, address })
                        };
                        fetch(url, requestOptions)
                        .then(res => res.json())
                        .then((result) => {
                            console.log(result);
                            if(result == true){
                                setCanLogin(true)
                            }
                        })
                        .catch(error => console.log('Form submit error', error))
                    }
                    else{
                        if(username == '') window.alert("Username không được trống!");
                        else{
                            if(password == '') window.alert("Password không được trống!");
                            else{
                                if(email == '') window.alert("Email không được trống!");
                                else{
                                    if(mssv == '') window.alert("MSSV không được trống!");
                                    else if(fullname == '') window.alert("Họ tên không được trống!");
                                }
                            }
                        }
                    }
                }
                else{
                   window.alert(result.message);
                }
            }
        )
    };
    if(canLogin){
        return (
            <Navigate to="/login"/>
        )
    }
    if (localStorage.access_token){
        localStorage.removeItem("access_token");
        return (
            <Navigate to="/login"/>
        );
    }
    return (
        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/login"}>Classroom</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Đăng nhập</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/register"}>Đăng kí</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>

                        <h3>Đăng kí tài khoản</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={username} onChange={handleChangeUsername} className="form-control" placeholder="User name" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={handleChangePassword} className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Tên đầy đủ</label>
                            <input type="text" value={fullname} onChange={handleChangeFullname} className="form-control" placeholder="Full name" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={handleChangeEmail} className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="phone" value={phone} onChange={handleChangePhone} className="form-control" placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label>MSSV</label>
                            <input type="mssv" value={mssv} onChange={handleChangeMSSV} className="form-control" placeholder="Enter MSSV" />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input type="address" value={address} onChange={handleChangeAddress} className="form-control" placeholder="Enter địa chỉ" />
                        </div>
                        <br />
                        <button type="submit" onClick={handleSubmit}  className="btn btn-primary btn-block">Đăng kí</button>
                        <p className="forgot-password text-right">
                            Bạn đã có tài khoản? <Link className="nav-link" to={"/login"}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
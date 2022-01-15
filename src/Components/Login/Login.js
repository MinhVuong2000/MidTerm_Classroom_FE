import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import { useNavigate, Redirect, Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import LoginByGoogle from './GoogleLogin/GoogleLogin';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDown = (event) => {
    event.preventDefault();
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (username !== '' && password !== '') {

            const url = DOMAIN_API + "login";
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    if (result.access_token==='error_username'){window.alert("Username không tồn tại!")}
                    else if (result.access_token==='error_password'){window.alert("Password không đúng!")}
                    else{
                        localStorage.setItem('access_token', result.access_token);
                        localStorage.setItem('check_admin', result.isAdmin);
                        setPassword('');
                    }
                })
                .catch(error => console.log('Form submit error', error))
        }
        else{
            window.alert("Username và Password không được trống!");
        }
    }
    if(localStorage.getItem('check_admin')=='true' && localStorage.getItem('access_token')){
        return (
            <Navigate to="/admin"/>
        )
    }
    if (localStorage.getItem('access_token')){
        return (
            <Navigate to="/"/>
        )
    }
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}><h1>Classroom</h1></Link>
                    <div className="collapse navbar-collapse login-register-link" id="navbarTogglerDemo02">
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
                        <h2>Đăng nhập</h2>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="Nhập Username" value={username} onChange={handleChangeUsername}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            {/* <input type="password" name="password" id="password" className="form-control" placeholder="Nhập password" value={password} onChange={handleChangePassword}/> */}
                            <Input
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Nhập mật khẩu" 
                                value={password} 
                                onChange={handleChangePassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDown}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Nhớ đăng nhập</label>
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} name="signin" id="signin" class="form-submit" value="Đăng nhập">Đăng nhập</button>
                        <p className="forgot-password text-right">
                            <a href="/forget-password">Quên mật khẩu?</a>
                        </p>
                        <p className="forgot-password text-right">
                            <a href="/register">Bạn chưa có tài khoản?</a>
                        </p>
                    </form>
                    <div class="social-login">
                        <span class="social-label">Hoặc đăng nhập bằng </span>
                        <LoginByGoogle reload={setPassword}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

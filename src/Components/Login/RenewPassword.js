import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';


export default function RenewPassword(props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirm, setConfirm] = useState('');
    let navigate = useNavigate();
    const { state } = useLocation();
    
    console.log("state RenewPassword:", state);
    if (state==null)
    {
        return (
            <Navigate to="/login"/>
        )
    }
    const email = state.email;
    console.log("email RenewPassword:", email);

    function handleChangePassword(event){
        setPassword(event.target.value);
    }

    function handleChangeConfirm(event){
        setConfirm(event.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirm = () => {
        setShowConfirm(!showConfirm);
    };
    
    const handleMouseDown = (event) => {
    event.preventDefault();
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (password === '' || confirm === '') {
            window.alert("Các ô nhập không được trống!");
            return;
        }
        if (password !== confirm){
            window.alert("Password và xác nhận password phải trùng nhau!");
            return;
        }
        const url = DOMAIN_API + `renew-password`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, email })
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                navigate('/login');
            })
            .catch(error => console.log('Lỗi submit', error))
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
                        <h2>Thiết lập mật khẩu mới</h2>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <Input
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Nhập mật khẩu mới" 
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
                            <label>Nhập lại mật khẩu mới</label>
                            <Input
                                type={showConfirm ? "text" : "password"} 
                                name="confirm" 
                                id="confirm" 
                                className="form-control" 
                                placeholder="Xác nhận mật khẩu mới" 
                                value={confirm} 
                                onChange={handleChangeConfirm}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowConfirm}
                                        onMouseDown={handleMouseDown}
                                    >
                                        {showConfirm ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block" 
                        onClick={handleSubmit} name="renew_pass" id="renew_pass" 
                        class="form-submit">Thay đổi</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
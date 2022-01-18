import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    const notify = (message) => { toast(message)};
    
    function handleChangeEmail(event){
        setEmail(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '') {

            const url = DOMAIN_API + `get-otp`;
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    if (result===false){
                        window.alert("Không có tài khoản nào có email này!");
                    }
                    else{
                        navigate("/forget-password/send-otp", { state: {email: email }});
                    }
                })
                .catch(error => console.log('Lỗi submit', error))
        }
        else{
            window.alert("Email không được trống!");
        }
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
                    <Link className="navbar-brand" to={"/login"}><h1>Classroom</h1></Link>
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
                        <h2>Quên mật khẩu</h2>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <label>Email nhận OTP</label>
                            <input type="text" name="email" id="email" className="form-control" 
                            placeholder="Nhập Email" value={email} onChange={handleChangeEmail}/>
                        </div>
                        <br />
                        <Button type="submit"  variant="contained" style={{marginRight: "10px"}}
                        onClick={handleSubmit} name="otp_renew_pass" id="otp_renew_pass" 
                        >Nhận OTP</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';


export default function ForgetPasswordSendOTP() {
    const [otp, setOTP] = useState('');
    
    let navigate = useNavigate();
    const { state } = useLocation();
    
    if (state==null)
    {
        return (
            <Navigate to="/login"/>
        )
    }
    const email = state.email;

    function handleChangeOTP(event){
        setOTP(event.target.value);
    }

    function resendOTP(event){
        event.preventDefault();
        const url = DOMAIN_API + `get-otp`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result===false){window.alert("Không có tài khoản nào có email này!")}
                else{
                    window.alert('Đã gửi lại thanh công OTP!');
                }
            })
            .catch(error => console.log('Lỗi submit', error))
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (otp !== '') {
            const url = DOMAIN_API + `check-otp`;
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, email })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    if (result===false){
                        window.alert("OTP không khớp với OTP đã gửi!")
                    }
                    else{
                        navigate("/renew-password", { state: {email: email }});
                    }
                })
                .catch(error => console.log('Lỗi submit', error))
        }
        else{
            window.alert("OTP không được trống!");
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
                        <h2>Nhập OTP</h2>
                        <br/>
                        <p>Nhập OTP trong thư vừa được gửi đến {email}</p>
                        <div className="form-group">
                            <label>OTP</label>
                            <input type="text" name="otp" id="otp" className="form-control" 
                            placeholder="Nhập OTP" value={otp} onChange={handleChangeOTP}/>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block" 
                        onClick={handleSubmit} name="otp_renew_pass" id="otp_renew_pass" 
                        class="form-submit">Kiểm tra OTP</button>
                        <p className="forgot-password text-right">
                            <button onClick={resendOTP}> Gửi lại OTP </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
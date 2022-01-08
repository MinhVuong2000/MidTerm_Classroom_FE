import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';


export default function ForgetPasswordSendOTP({route, navigation}) {
    const [otp, setOTP] = useState('');
    let navigate = useNavigate();
    const { email } = route.params;

    function handleChangeOTP(event){
        setOTP(event.target.value);
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
                    if (result===false){window.alert("OTP không khớp với OTP đã gửi!")}
                    else{
                        navigate("/renew-password", {email: email});
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
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{display: 'hidden'}}>
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
                        <h2>Điền OTP</h2>
                        <br/>
                        <p>Điền OTP trong thư vừa được gửi đến email:{email}</p>
                        <div className="form-group">
                            <label>OTP</label>
                            <input type="text" name="email" id="email" className="form-control" 
                            placeholder="Nhập OTP" value={email} onChange={handleChangeOTP}/>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block" 
                        onClick={handleSubmit} name="otp_renew_pass" id="otp_renew_pass" 
                        class="form-submit">Kiểm tra OTP</button>
                        <p className="forgot-password text-right">
                            <a onClick={()=>navigate("/forget-password/send-otp", {email: email})}>Gửi lại OTP</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
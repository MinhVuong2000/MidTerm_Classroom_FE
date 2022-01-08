import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';


export default function RenewPassword({route, navigation}) {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    let navigate = useNavigate();
    const { email } = route.params;

    function handleChangePassword(event){
        setPassword(event.target.value);
    }

    function handleChangeConfirm(event){
        setConfirm(event.target.value);
    }

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
                        <h2>Thiết lập mật khẩu mới</h2>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input type="text" name="password" id="password" className="form-control" 
                            placeholder="Nhập mật khẩu mới" value={password} onChange={handleChangePassword}/>
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu mới</label>
                            <input type="text" name="confirm" id="confirm" className="form-control" 
                            placeholder="Xác nhận mật khẩu mới" value={confirm} onChange={handleChangeConfirm}/>
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
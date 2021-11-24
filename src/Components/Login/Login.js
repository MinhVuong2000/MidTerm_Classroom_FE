import signin_image from '../../static/images/signin-image.jpeg';
import '../Login/Login.css';
import { useState, useEffect } from "react";
import {DOMAIN_API}  from '../../config/const';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeUsername(event){
        setUsername(event.target.value)
    }
    function handleChangePassword(event){
        setPassword(event.target.value)
    }
    function handleSubmit(event) {
        console.log(`${username}`);
        console.log(`${password}`);
        event.preventDefault();
        if(username!==''&&password!==''){
         
            const url = DOMAIN_API+"users/login";
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
        else{
            window.alert("Username and Password must not empty!");
        }
        
    }
    return (
        <div class="main">
            <div>BC<br/><br/><br/><br/>BR</div>
            <div class="sign-in">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src={signin_image} alt="signin image"/></figure>
                            <a href="/register" class="signup-image-link">Tạo tài khoản mới</a>
                        </div>

                        <div class="signin-form">
                            <h2 class="form-title">Đăng nhập</h2>
                            
                            <form method="POST" class="register-form" id="login-form" action="">
                                <div class="form-group">
                                    <label for="username"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="username" placeholder="Username" value={username}
                        onChange={handleChangeUsername}/>
                                </div>
                                <div class="form-group">
                                    <label for="password"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" placeholder="Password" value={password}
                        onChange={handleChangePassword}/>
                                </div>
                                <div className="alignright">
                                    <a id="forgot_pass" class="label-agree-term text-danger" href="/reset-password">Quên mật khẩu</a>
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" onClick={handleSubmit} name="signin" id="signin" class="form-submit" value="Đăng nhập"/>
                                </div>
                            </form>
                            <div class="social-login">
                                <span class="social-label">Hoặc đăng nhập bằng</span>
                                <ul class="socials">
                                    <li><a href="/auth/google"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
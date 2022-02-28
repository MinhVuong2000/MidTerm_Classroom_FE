import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from '@mui/material/IconButton';
import { Navigate, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import LoginByGoogle from './GoogleLogin/GoogleLogin';
import Button from '@mui/material/Button';
import Header from '../Header/Header'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';



export default function Login({ socket, setIsLogined, navigate }) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{ margin: "60px", justifyContent: "center" }}>
                        <form>
                            <h2>Đăng nhập</h2>

                            <div className="form-group">
                                <label>Email</label>
                                <Input type="text" name="username" id="username" className="form-control" placeholder="Nhập Email" value={email} />
                            </div>

                            <div className="form-group" style={{marginTop:"10px"}}>
                                <label>Mật khẩu</label>
                                {/* <input type="password" name="password" id="password" className="form-control" placeholder="Nhập password" value={password} onChange={handleChangePassword}/> */}
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    
                                    id="password"
                                    className="form-control"
                                  
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            >
                                                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>

                            <div className="form-group" style={{marginTop:"5px"}}>
                                <p className="forgot-password text-right">
                                    <Link to="/forget-password"  style={{color:"#00B14F",textDecoration: "none"}}>Quên mật khẩu?</Link>
                                </p>
                            </div>

                            <Button type="submit"
                                name="signin" id="signin" value="Đăng nhập" variant="contained"
                                style={{ backgroundColor: "#00B14F", width: "auto" }}>Đăng nhập
                            </Button>
                            <div className="d-flex align-items-end flex-column">
                                <div style={{ fontSize: "16px", marginBottom:"5px" }}>
                                    Hoặc đăng nhập bằng </div>
                                <LoginByGoogle reload={setPassword} navigate={navigate}  />
                                <div style={{marginTop:"20px"}}>
                                <p className="forgot-password text-right"> <span> Bạn chưa có tài khoản?</span>
                                    <Link to="/register" style={{color:"#00B14F", fontWeight: "bold",textDecoration: "none"}}> Đăng ký ngay</Link>
                                </p>
                                </div>
                            </div>
                        </form>

                    </div>
                </Grid>
                <Grid item xs={6} className="center-parent">
                    <div className="center-me">
                        <img src="login_user.jpg"></img>
                    </div>
                </Grid>

            </Grid>
        </div >
    )
}

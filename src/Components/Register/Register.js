import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from '@mui/material/IconButton';
import { Navigate, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';

import Button from '@mui/material/Button';
import Header from '../Header/Header'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';



export default function Login({ socket, setIsLogined, navigate }) {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{ margin: "60px", justifyContent: "center" }}>
                        <form>
                            <h2>Đăng ký</h2>

                            <div className="form-group">
                                <label>Họ và tên</label>
                                <Input type="text" name="username" id="username" className="form-control" placeholder="Nhập họ và tên của bạn" value={name} />
                            </div>

                            <div className="form-group" style={{marginTop:"10px"}}> 
                                <label>Email</label>
                                <Input type="text" name="username" id="username" className="form-control" placeholder="Nhập Email của bạn" value={email} />
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
                        
                                <p className="forgot-password text-right"> <span>  Bằng việc đăng ký tài khoản, bạn đã đồng ý với</span>
                                    <Link to="/register" style={{color:"#00B14F",textDecoration: "none"}}> Điều khoản dịch vụ</Link>
                                    <span> và</span> <Link to="/register" style={{color:"#00B14F", textDecoration: "none"}}>  Chính sách bảo mật </Link>
                                    <span>của chúng tôi</span>
                                </p>
                            </div>

                            <Button type="submit" fullWidth
                                name="signin" id="signin" value="Đăng nhập" variant="contained"
                                style={{ backgroundColor: "#00B14F", width: "auto" }}>Đăng ký
                            </Button>                            
                           
                        </form>
                        <div style={{marginTop:"10px"}}> 
                        <p className="forgot-password text-left"> <span> Bạn đã có tài khoản?</span>
                                    <Link to="/login" style={{color:"#00B14F", fontWeight: "bold",textDecoration: "none"}}> Đăng nhập ngay</Link>
                                </p>
                                </div>

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

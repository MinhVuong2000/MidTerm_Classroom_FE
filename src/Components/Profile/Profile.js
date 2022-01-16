import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { DOMAIN_API, 
    ENTER_PASSWORD_TITLE, ENTER_PASSWORD_DESC ,
    ENTER_MSSV_TITLE, ENTER_MSSV_DESC,
    EXISTED_MSSV_TITLE, EXISTED_MSSV_DESC,
    SUCCESS_PASSWORD_TITLE, SUCCESS_PASSWORD_DESC,
    SUCCESS_PROFILE_TITLE, SUCCESS_PROFILE_DESC } from '../../config/const';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import AlertDialog from '../AlertDialog/AlertDialog';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isEditting, setIsEditting] = useState(false);
    const [fullName, setFullName] = useState(null);
    const [curPassword, setCurPassword] = useState('');
    const [changePass, setChangePass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [openSuccessChangePassword, setOpenSuccessChangePassword] = useState(false);
    const [openSuccessChangeProfile, setOpenSuccessChangeProfile] = useState(false);
    const [MSSV, setMSSV] = useState(null);
    const [isNullMSSV, setIsNullMSSV] = useState(false);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [openNullPassword, setOpenNullPassword] = useState(false);
    const [openNullMSSV, setOpenNullMSSV] = useState(false);
    const [openExistedMSSV, setOpenExistedMSSV] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    let actoken = localStorage.getItem('access_token');

    const handleClickShowCurPassword = () => {
        setShowCurrentPass(!showCurrentPass);
    };

    const handleClickShowChangePass = () => {
        setShowChangePass(!showChangePass);
    };

    const handleClickShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    };
    
    const handleMouseDown = (event) => {
    event.preventDefault();
    };

    function handleChangePassword(){
        if (changePass === '' || confirmPass==='' || curPassword===''){
            setOpenNullPassword(true);
            return;
        }
        if (confirmPass !== changePass){
            window.alert('Mật khẩu mới và mật khẩu xác nhận không khớp!');
            return;
        }
        //check mật khẩu hiện tại
        let url = DOMAIN_API + `users/check-password`;
        let requestOptions = {
            method: 'POST',
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({password: curPassword})
        };
        fetch(url, requestOptions).then(res =>res.json())
            .then((result) => {
                if (result===false){
                    window.alert('Mật khẩu hiện tại không đúng!');
                    return;
                }
                else{
                    url = DOMAIN_API + `users/update-password`;
                    requestOptions = {
                    method: 'PATCH',
                    headers: new Headers({
                        "x-access-token": actoken,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({new_password: changePass})
                    };
                    fetch(url, requestOptions).then(res =>res.json())
                    .then((result) => {
                        setCurPassword('');
                        setChangePass('');
                        setConfirmPass('');
                        setOpenSuccessChangePassword(true);
                    }).catch(error => console.log('Form submit error', error))
                }
        }).catch(error => console.log('Form submit error', error))
    }

    function handleSaveEditProfile(){
        if (MSSV === '' || MSSV===null){
            setOpenNullMSSV(true);
            return;
        }
        if (isNullMSSV){
            fetch(DOMAIN_API + `is-available-mssv?mssv=` + MSSV, {
                method: 'GET',
                headers: new Headers({
                    "x-access-token": actoken,
                }),
            }).then(res =>res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result===false)
                        setOpenExistedMSSV(true)
                    else{
                        setOpenSuccessChangeProfile(true);
                        setIsEditting(false);
                        setIsNullMSSV(false);
                        const url = DOMAIN_API + `users/update-profile`;
                        const updated_profile = {
                            full_name: fullName,
                            id_uni: MSSV.toString(),
                            phone: phone,
                            email: email,
                            address: address
                        }
                        const requestOptions = {
                        method: 'PATCH',
                        headers: new Headers({
                            "x-access-token": actoken,
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({updated_profile: updated_profile})
                        };
                        fetch(url, requestOptions)
                        .catch(error => console.log('Form submit error', error))
                    }
                },
                (error) => {
                    console.log("Error", error);
                    setError(error);
                })
        }
        else{
            setOpenSuccessChangeProfile(true);
            setIsEditting(false);
            const url = DOMAIN_API + `users/update-profile`;
            const updated_profile = {
                full_name: fullName,
                phone: phone,
                email: email,
                address: address
            }
            const requestOptions = {
            method: 'PATCH',
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({updated_profile: updated_profile})
            };
            fetch(url, requestOptions)
            .catch(error => console.log('Form submit error', error))
        }
    }

    useEffect(() => {
        fetch(DOMAIN_API + "users/profile", {
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Result profile: ", result);
                    if (result == '400' || result == '401') {
                        setProfile(result);
                    }
                    else {
                        setProfile(result);
                        setFullName(result.full_name)
                        setMSSV(result.id_uni)
                        setIsNullMSSV(result.id_uni===null || result.id_uni==='')
                        setEmail(result.email)
                        setPhone(result.phone)
                        setAddress(result.address)
                    }
                    console.log("Success", result);
                },
                (error) => {
                    setError(error);
                    console.log("Error", error);
                    return (
                        <Navigate to="/logout" />
                    )
                }
            )
    }, [])

    if (profile=='400' || profile=='401'){
        return (
            <Navigate to="/logout" />
        )
    }
    if (profile!=null){
        return (
            <div className="d-flex justify-content-center">
                {isEditting ? 
                    <Card sx={{ maxWidth: 600, marginTop: "50px" }}>
                        {openExistedMSSV && <AlertDialog title={EXISTED_MSSV_TITLE} msg={EXISTED_MSSV_DESC} callback={() => {setOpenExistedMSSV(false)}}/>}
                        {openNullMSSV && <AlertDialog title={ENTER_MSSV_TITLE} msg={ENTER_MSSV_DESC} callback={() => {setOpenNullMSSV(false)}}/>}
                        <TextField
                            autoFocus
                            id="fullName"
                            label="Họ & Tên"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                        {isNullMSSV && <TextField
                            id="MSSV"
                            label="Mã số do trường cung cấp"
                            placeholder="Nhập chính xác vì không thể thay đổi sau này!"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={MSSV!=null ? MSSV : ''} 
                            onChange={e => setMSSV(e.target.value)}
                        />}
                        <TextField
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            id="phone"
                            label="Số điện thoại"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <TextField
                            id="address"
                            label="Địa chỉ"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <CardActions disableSpacing>
                            <IconButton aria-label="share" onClick={handleSaveEditProfile}>
                                <SaveIcon/>
                            </IconButton>
                            <Button aria-label="share" onClick={() => {setIsEditting(false)}}>
                                Cancel
                            </Button>
                        </CardActions>
                    </Card> : 
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Card sx={{ maxWidth: 1000, marginTop: "50px", padding:'40px' }}  className="d-flex justify-content-center">
                            <div>
                                {openNullPassword && <AlertDialog title={ENTER_PASSWORD_TITLE} msg={ENTER_PASSWORD_DESC} callback={() => {setOpenNullPassword(false)}}/>}
                                {openSuccessChangePassword && <AlertDialog title={SUCCESS_PASSWORD_TITLE} msg={SUCCESS_PASSWORD_DESC} callback={() => {setOpenSuccessChangePassword(false)}}/>}
                                {openSuccessChangeProfile && <AlertDialog title={SUCCESS_PROFILE_TITLE} msg={SUCCESS_PROFILE_DESC} callback={() => {setOpenSuccessChangeProfile(false)}}/>}
                                
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <h1>Thông tin cá nhân</h1>
                                    <CardActions disableSpacing sx={{marginLeft:'30px'}}>
                                        <IconButton aria-label="share" onClick={() => {setIsEditting(true);}}>
                                            <ModeEditIcon/>
                                        </IconButton>
                                    </CardActions>
                                </div>
                                <CardHeader
                                    avatar={
                                        <AccountCircleIcon >
                                        </AccountCircleIcon>
                                    }
                                    title="Họ và tên"
                                    subheader={fullName}
                                />
                                <CardHeader
                                    avatar={
                                        <AccountCircleIcon >
                                        </AccountCircleIcon>
                                    }
                                    title="Username"
                                    subheader={profile.username}
                                />

                                {MSSV ? <CardHeader
                                    avatar={
                                        <SubtitlesIcon >
                                        </SubtitlesIcon>
                                    }

                                    title="Mã số do trường cung cấp"
                                    subheader={MSSV}
                                />
                                : <CardHeader
                                    avatar={
                                        <SubtitlesIcon >
                                        </SubtitlesIcon>
                                    }

                                    title="Mã số do trường cung cấp"
                                    subheader='Chưa có'
                                />}

                                {email ? <CardHeader
                                    avatar={
                                        <AlternateEmailSharpIcon >
                                        </AlternateEmailSharpIcon>
                                    }
                                    title="Email"
                                    subheader={email}
                                />
                                    : <CardHeader
                                        avatar={
                                            <AlternateEmailSharpIcon >
                                            </AlternateEmailSharpIcon>
                                        }
                                        title="Email"
                                        subheader="Chưa có"
                                    />}

                                {phone ?
                                    <CardHeader
                                        avatar={
                                            <CallIcon>
                                            </CallIcon>
                                        }
                                        title="Số điện thoại"
                                        subheader={phone}
                                    />
                                    : <CardHeader
                                        avatar={
                                            <CallIcon>
                                            </CallIcon>
                                        }
                                        title="Số điện thoại"
                                        subheader="Chưa có"
                                    />}
                                {address ?
                                    <CardHeader
                                        avatar={
                                            <LocationOnIcon >
                                            </LocationOnIcon>
                                        }
                                        title="Địa chỉ"
                                        subheader={address}
                                    /> : <CardHeader
                                        avatar={
                                            <LocationOnIcon >
                                            </LocationOnIcon>
                                        }
                                        title="Địa chỉ"
                                        subheader="Chưa có"
                                    />}
                            </div>
                        </Card>
                        {!profile.is_social_login && <Card sx={{ maxWidth: 400, marginTop: "50px", marginLeft:'50px', padding:'40px' }} >
                            <Typography gutterBottom variant="h4" component="div">
                                Thay đổi mật khẩu
                            </Typography>
                            <TextField
                                id="cur_password"
                                label="Mật khẩu hiện tại"
                                type={showCurrentPass ? "text" : "password"}
                                fullWidth
                                variant="standard"
                                value={curPassword}
                                onChange={e => setCurPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowCurPassword}
                                                onMouseDown={handleMouseDown}
                                            >
                                                {showCurrentPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                id="new_password"
                                label="Mật khẩu mới"
                                type={showChangePass ? "text" : "password"}
                                fullWidth
                                variant="standard"
                                value={changePass}
                                onChange={e => setChangePass(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowChangePass}
                                                onMouseDown={handleMouseDown}
                                            >
                                                {showChangePass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                id="confirm_password"
                                label="Xác nhận Mật khẩu mới"
                                type={showConfirmPass ? "text" : "password"}
                                fullWidth
                                variant="standard"
                                value={confirmPass}
                                onChange={e => setConfirmPass(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPass}
                                                onMouseDown={handleMouseDown}
                                            >
                                                {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <CardActions disableSpacing>
                                <IconButton onClick={handleChangePassword}>
                                    Thay đổi<SaveIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>}
                    </div>
                }
            </div>
        )
    }
    else{
        return(
            <div>
                Loading...
                {/* <h2>Bạn chưa đăng nhập</h2>
                <Link to='/logout'>Đăng nhập</Link> */}
            </div>
        )
    }
}
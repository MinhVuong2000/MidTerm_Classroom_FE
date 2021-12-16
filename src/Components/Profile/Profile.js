import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isEditting, setIsEditting] = useState(false);
    const [fullName, setFullName] = useState(null);
    const [password, setPassword] = useState(null);
    const [MSSV, setMSSV] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    let actoken = localStorage.getItem('access_token');

    function handleChangePassword(){
        console.log("New password:", password);
        const url = DOMAIN_API + `users/update-password`;
        const requestOptions = {
        method: 'PATCH',
        headers: new Headers({
            "x-access-token": actoken,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({new_password: password})
        };
        fetch(url, requestOptions)
        .catch(error => console.log('Form submit error', error))
        setProfile('400');
    }

    function handleSaveEditProfile(){
        setIsEditting(false);
        const url = DOMAIN_API + `users/update-profile`;
        const updated_profile = {
            full_name: fullName,
            id_uni: MSSV,
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
                        console.log("result", result);
                        setProfile(result);
                    }
                    else {
                        setProfile(result);
                        setFullName(result.full_name)
                        setMSSV(result.id_uni)
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
            <div>
                {isEditting ? 
                    <Card sx={{ maxWidth: 600, marginTop: "50px" }} >
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
                        {MSSV==null && <TextField
                            id="MSSV"
                            label="Mã số do trường cung cấp"
                            placeholder="Nhập chính xác vì không thể thay đổi sau này!"
                            type="text"
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
                        </CardActions>
                    </Card> : <Card sx={{ maxWidth: 1000, marginTop: "50px" }}  className="d-flex justify-content-center">
                        <div>
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

                            <CardActions disableSpacing>
                                <IconButton aria-label="share" onClick={() => {setIsEditting(true);}}>
                                    Chỉnh sửa profile<ModeEditIcon/>
                                </IconButton>
                            </CardActions>
                        </div>
                        {!profile.is_social_login && <Card sx={{ maxWidth: 600, marginTop: "50px" }} >
                            <Typography gutterBottom variant="h5" component="div">
                                Thay đổi mật khẩu
                            </Typography>
                            <TextField
                                id="new_password"
                                label="Mật khẩu mới"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <CardActions disableSpacing>
                                <IconButton onClick={handleChangePassword}>
                                    Lưu mật khẩu mới<SaveIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>}
                    </Card>
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
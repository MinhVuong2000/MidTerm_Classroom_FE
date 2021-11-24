import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(DOMAIN_API + "users/profile", {
            method: "GET",
            headers: new Headers({
                "x-access-token": localStorage.getItem('access_token')
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message) {
                        setProfile(null)
                    }
                    else {
                        setProfile(result)
                    }
                    console.log("Success", result);
                },
                (error) => {
                    setError(() => { return error });
                    console.log("Error", error);
                    return (
                        <div>
                            <p>You need login to access this infomation.</p>
                            <Link to="/login">Login</Link>
                        </div>
                    )
                }
            )
    }, [])

    if (profile != null) {
        return (
            // <div style={{display: 'flex',  flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            //     <h1>{profile.full_name}</h1>
            //     <h2>Mã số do trường cung cấp: {profile.id_uni}</h2>
            //     {profile.email? <h3><br/>Email: {profile.email}</h3>:<h3>Email: trống<br/></h3>}
            //     {profile.phone? <h3><br/>Số điện thoại: {profile.phone}</h3>:<h3>Số điện thoại: trống<br/></h3>}
            //     {profile.address? <h3><br/>Địa chỉ: {profile.address}</h3>:<h3>Địa chỉ: trống<br/></h3>}
            // </div>
            <div className="d-flex justify-content-center">
                <Card sx={{ maxWidth: 600, marginTop: "50px" }} >
                    <CardHeader
                        avatar={
                            <AccountCircleIcon >
                            </AccountCircleIcon>
                        }
                        title="Họ và tên"
                        subheader={profile.full_name}
                    />

                    <CardHeader
                        avatar={
                            <SubtitlesIcon >
                            </SubtitlesIcon>
                        }

                        title="Mã số do trường cung cấp"
                        subheader={profile.id_uni}
                    />


                    {profile.email ? <CardHeader
                        avatar={
                            <AlternateEmailSharpIcon >
                            </AlternateEmailSharpIcon>
                        }
                        title="Email"
                        subheader={profile.email}
                    />
                        : <CardHeader
                            avatar={
                                <AlternateEmailSharpIcon >
                                </AlternateEmailSharpIcon>
                            }
                            title="Email"
                            subheader="Chưa có"
                        />}

                    {profile.phone ?
                        <CardHeader
                            avatar={
                                <CallIcon>
                                </CallIcon>
                            }
                            title="Số điện thoại"
                            subheader={profile.phone}
                        />
                        : <CardHeader
                            avatar={
                                <CallIcon>
                                </CallIcon>
                            }
                            title="Số điện thoại"
                            subheader="Chưa có"
                        />}
                    {profile.address ?
                        <CardHeader
                            avatar={
                                <LocationOnIcon >
                                </LocationOnIcon>
                            }
                            title="Địa chỉ"
                            subheader={profile.address}
                        /> : <CardHeader
                            avatar={
                                <LocationOnIcon >
                                </LocationOnIcon>
                            }
                            title="Địa chỉ"
                            subheader="Chưa có"
                        />}

                    <CardActions disableSpacing>
                        <IconButton aria-label="share">
                            <ModeEditIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>You need login to access this infomation.</p>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}
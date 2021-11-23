import { useState, useEffect } from "react";
import  { Link } from 'react-router-dom';
import {DOMAIN_API}  from '../../config/const';

export default function Profile(){
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(DOMAIN_API+"users/profile",{
            method: "GET",
            headers: new Headers({
                "x-access-token": localStorage.getItem('access_token')
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.message){
                    setProfile(null)
                }
                else{
                    setProfile(result)
                }
                console.log("Success", result);
            },
            (error) => {
                setError(() => { return error});
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

    if (profile!=null){
        return(
            <div style={{display: 'flex',  flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                <h1>{profile.full_name}</h1>
                <h2>Mã số do trường cung cấp: {profile.id_uni}</h2>
                {profile.email? <h3><br/>Email: {profile.email}</h3>:<h3>Email: trống<br/></h3>}
                {profile.phone? <h3><br/>Số điện thoại: {profile.phone}</h3>:<h3>Số điện thoại: trống<br/></h3>}
                {profile.address? <h3><br/>Địa chỉ: {profile.address}</h3>:<h3>Địa chỉ: trống<br/></h3>}
            </div>
        )
    }
    else{
        return (
            <div>
                <p>You need login to access this infomation.</p>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}
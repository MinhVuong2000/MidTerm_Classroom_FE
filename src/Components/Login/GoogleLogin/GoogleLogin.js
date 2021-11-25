import GoogleLogin from "react-google-login";
import {googleClientID, DOMAIN_API} from '../../../config/const';

export default function LoginByGoogle({reload}){
    function  onGoogleLoginSuccess(googleAuth){
        const profile = googleAuth.profileObj;
        const accountGoogle = {
            email: profile.email,
            username: profile.email,
            full_name: profile.name,
            password: profile.googleId
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(accountGoogle)
        };
        fetch(DOMAIN_API+'google-login',requestOptions)
            .then(res => res.json())
            .then((result) => {
                localStorage.setItem('access_token', result.access_token);
                console.log('access_token:',result.access_token);
                reload('')
            })
            .catch(error => console.log('Google login error', error))
    }

    function onGoogleLoginFailure(error){
        
        console.log("GoogleLogin Failured",error);
    }

    return (<GoogleLogin
        clientId={googleClientID}
        buttonText='Google'
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
    />)
}


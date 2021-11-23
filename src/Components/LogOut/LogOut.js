import  { Navigate, useHistory } from 'react-router-dom';

export default function LogOut(){

    localStorage.removeItem("access_token");
    
    return (
        <Navigate to="/login"/>
    );
}
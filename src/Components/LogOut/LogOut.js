import  { Navigate } from 'react-router-dom';

export default function LogOut({socket}){
    socket?.disconnect();
    localStorage.removeItem("access_token");
    localStorage.removeItem("check_admin");
    console.log(" Check logout: ", localStorage.ckeck_admin);
    return (
        <Navigate to="/login"/>
    );
}
import { isAuthenticated } from "../backendjoin/auth";
import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
// Route protection
const PrivateRoute = () => {
    let users = isAuthenticated();
    console.log(users)
    return (
        users ? <Outlet /> : <Navigate to = {`/user`} />
    )
}
export default PrivateRoute
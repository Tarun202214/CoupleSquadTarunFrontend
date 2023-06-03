import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isAuthenticated } from './backendjoin/auth';
import Login from './userFunc/login';
import SignIn from './userFunc/signin';
import UserProf from './userFunc/user';
import PrivateRoute from './protectedroute/privateroute';
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route element = {<UserProf />}  path="/user"/>
      </Route>
    </Routes>
  </BrowserRouter>
);

import React, { useState, useEffect } from "react";
import { Router, Routes, NativeRouter, Route, Redirect, Link } from "react-router-native";
import { render } from "react-dom";
//import Register from "./frontend/Register.js";
import CharCreate from "./frontend/CharCreate.js";
//import QuestForm from "./frontend/components/QuestPage";
import Login from "./frontend/Login.js";
import Auth from "./frontend/auth.js";
import 'localstorage-polyfill';

export default function App() {

  const token = localStorage.getItem("token")
  console.log(token);
    // true == active user (logged in)
    const [state, setState] = useState(token !== null && token !== "" ? true : false);

    // Set user vars to access the Canvas page
    function onLogin(active)
    {
        setState(active);
        return <Redirect to="/charCreate"/>
    }

    // clear all fields on logout
    function onLogout(active)
    {
        setState(active);
        return <Redirect to="/" />
    }

    function getUser(token) {

    }

    return (
      <NativeRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/charCreate" element={<CharCreate/>}/>
            <Route path="/auth" element={<Auth/>}/>
          </Routes>
      </NativeRouter>
  );
    
}
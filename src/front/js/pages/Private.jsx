import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate()

    useEffect(()=>{
        if (!localStorage.getItem('token')) navigate('/')
        actions.checkUser()
    },[])

    const handleLogout = () => {
        localStorage.removeItem('token')
            navigate('/')
    }

    return (
        <div>
            <h2>vista privada</h2>
            <p>Usuario: {store.user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
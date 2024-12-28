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
        <div className="container mt-5 p-4 bg-light shadow rounded">
        <h2 className="text-center text-primary mb-4">Vista Privada</h2>
        <p className="text-secondary text-center">
            <strong>Usuario:</strong> {store.user?.email}
        </p>
        <div className="d-flex justify-content-center">
            <button 
                onClick={handleLogout} 
                className="btn btn-danger mt-3 px-4"
            >
                Logout
            </button>
        </div>
    </div>
    )
}
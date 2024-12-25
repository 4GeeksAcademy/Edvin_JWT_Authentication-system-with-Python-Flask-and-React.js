import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Register = () => {

    const [store, actions] = useContext(Context);   
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
    }

    return(
        <form onsubmit={handleSubmit} className="form-control">
            <input type="text" className="form-control" onChange={handleChange} name="email" placeholder="email"/>
            <input type="password" className="form-control" onChange={handleChange} name="password" placeholder="password"/>
            <input type="submit" value="register" />
        </form>
    )
}

import React, { useState, useEffect } from 'react';
import image from '../assets/activation.jpg';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';


export default function Register({match}) {
    const [userData, setUserData] = useState({
        username: "",
        token: ""
    });

    useEffect(() => {
        let token = match.params.token;
        let {username} = jwt.decode(token);
        if(token){
            setUserData({
                ...userData,
                username,
                token
            })
        }
    }, [match.params]);

    const {username, token} = userData;

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/users/activation', {token})
            .then(res => {
                setUserData({...userData});
                toast.success(res.data.message);
            })
            .catch(err => toast.error(err.response.data.error))
    }
    return (
        <div className='background-user'>
            {isAuth() ? <Redirect to='/'/> : null}
            <ToastContainer/>
            <div className='background-flex'>
                <div className='flex-register'>
                    <h2>Activate your account, {username}</h2>
                    <form className='flex-form' onSubmit={handleSubmit}>
                        <input type='submit' value='Activate'/>
                    </form>
                    <span className='separator'><p style={{margin: '4rem 0'}}>or</p></span>
                    <Link to='/register' className='login-btn' style={{fontWeight: 'bold'}}>
                        Register
                    </Link>
                    <Link to='/login' className='login-btn' style={{fontWeight: 'bold'}}>
                        Login
                    </Link>
                </div>
                <img src={image} alt='register'/>
            </div>
        </div>
    )
}
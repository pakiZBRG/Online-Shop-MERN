import React, { useState } from 'react';
import image from '../assets/register.jpg';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';


export default function Register() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const {username, email, password, passwordConfirm} = userData;

    const handleChange = text => e => setUserData({...userData, [text]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        if(username && email && password) { 
            if(password === passwordConfirm){
                axios.post('/users/register', {username ,email ,password})
                    .then(res => {
                        setUserData({
                            ...userData,
                            username: "",
                            email: "",
                            password: "",
                            passwordConfirm: ""
                        })
                        toast.success(res.data.message);
                    })
                    .catch(err => {
                        toast.error(err.response.data.error)
                    }) 
            } else {
                toast.error('Passwords do not match');
            }
        } else {
            toast.error('Please fill all fields');
        }
    }
    return (
        <div className='background-user'>
            {isAuth() ? <Redirect to='/'/> : null}
            <ToastContainer/>
            <div className='background-flex'>
                <div className='flex-register'>
                    <h2>Create an Account</h2>
                    <form className='flex-form' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            value={username}
                            onChange={handleChange('username')}
                            placeholder='Username'
                        />
                        <input
                            type='email'
                            value={email}
                            onChange={handleChange('email')}
                            placeholder='Email'
                            autoComplete="nope"
                        />
                        <input
                            type='password'
                            value={password}
                            onChange={handleChange('password')}
                            placeholder='Password'
                        />
                        <input 
                            type='password'
                            value={passwordConfirm}
                            onChange={handleChange('passwordConfirm')}
                            placeholder='Confirm password'
                        />
                        <input type='submit' value='Register'/>
                    </form>
                    <span className='separator'><p>or</p></span>
                    <Link to='/login' className='login-btn' style={{fontWeight: 'bold'}}>
                        <i className='fa fa-user' style={{marginRight: '0.5rem'}}></i>Login
                    </Link>
                </div>
                <img src={image} alt='register'/>
            </div>
        </div>
    )
}

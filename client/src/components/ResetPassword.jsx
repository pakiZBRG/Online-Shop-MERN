import React, { useState, useEffect } from 'react';
import image from '../assets/resetpassword.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function ResetPassword({match}) {
    const [userData, setUserData] = useState({
        password: "",
        confirmPassword: "",
        token: ""
    });

    const {password, passwordConfirm, token} = userData;
    useEffect(() => {
        let token = match.params.token;
        if(token){
            setUserData({ ...userData, token });
        }
    }, [])

    const handleChange = text => e => setUserData({...userData, [text]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        if((password === passwordConfirm) && passwordConfirm && password){
            axios.put('/users/resetpassword', {
                newPassword: password,
                resetPasswordLink: token
            })
            .then(res => {
                setUserData({ 
                    ...userData,
                    password: "",
                    passwordConfirm: ''
                });
                toast.success(res.data.message);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            })
        } else {
            toast.error('Passwords don\'t match');
        }
    }
    return (
        <div className='background-user'>
            <ToastContainer/>
            <div className='background-flex'>
                <div className='flex-register'>
                    <h2>Reset password</h2>
                    <form className='flex-form' onSubmit={handleSubmit}>
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
                        <input type='submit' value='Submit'/>
                    </form>
                    <span className='separator'><p style={{margin: '2.5rem 0'}}>or</p></span>
                    <Link to='/login' className='login-btn' style={{fontWeight: 'bold'}}>
                        <i className='fa fa-user' style={{marginRight: '0.5rem'}}></i>Login
                    </Link>
                </div>
                <img src={image} alt='forgotpassword'/>
            </div>
        </div>
    )
}

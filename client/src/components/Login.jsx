import React, { useState } from 'react';
import image from '../assets/login.jpg';
import axios from 'axios';
import { authenticate, googleAuth, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


export default function Login({history}) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = text => e => setUserData({...userData, [text]: e.target.value});
    
    const {email, password} = userData;

    const handleSubmit = e => {
        e.preventDefault();
        if(email && password) { 
            axios.post('/users/login', {email ,password})
                .then(res => {
                    authenticate(res, () => {
                        setUserData({
                            ...userData,
                            email: "",
                            password: ""
                        });
                    });
                    if(isAuth()){
                        history.push(`/user/${res.data.user.id}`);
                    }
                })
                .catch(err => toast.error(err.response.data.error));
        } else {
            toast.error('Please fill all fields');
        }
    }

    //Google Login
    const sendGoogleToken = tokenId => {
        axios.post('users/googlelogin', {idToken: tokenId})
            .then(res => redirectUser(res))
            .catch(() => toast.error('Google login error'))
    };
    const responseGoogle = response => sendGoogleToken(response.tokenId);

    //Facebook Login
    const sendFacebookToken = (userID, accessToken) => {
        axios.post('users/facebooklogin', {userID, accessToken})
            .then(res => redirectUser(res))
            .catch(() => toast.error('Facebook login error.'))
    };
    const responseFacebook = response => sendFacebookToken(response.userID, response.accessToken);

    //Redirect logged user via soacial media to his profile
    const redirectUser = res => {
        googleAuth(res, () => {
            isAuth() && history.push(`/`)
        });
    }

    return (
        <div className='background-user'>
            {isAuth() ? <Redirect to='/'/> : null}
            <ToastContainer/>
            <div className='background-flex'>
                <div className='flex-register'>
                    <h2>Login</h2>
                    <form className='flex-form' onSubmit={handleSubmit}>
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
                        <input type='submit' value='Login'/>
                        <Link to='/forgotpassword' className='forgot-password'>Forgot password?</Link>
                    </form>
                    <span className='separator'><p style={{margin: '2.5rem 0'}}>or</p></span>
                    <Link to='/register' className='login-btn' style={{fontWeight: 'bold'}}>
                        <i className='fa fa-user-plus' style={{marginRight: '0.5rem'}}></i>Create an account
                    </Link>
                    <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='login-btn google'
                            >
                                <i className='fa fa-google' style={{marginRight: '0.5rem'}}></i>Login with Google
                            </button>
                        )}
                    />
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                className='login-btn facebook'
                            >
                                <i className='fa fa-facebook' style={{marginRight: '0.5rem'}}></i>
                                Login with Facebook
                            </button>
                        )}
                    />
                </div>
                <img src={image} alt='login'/>
            </div>
        </div>
    )
}

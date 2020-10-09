import React from 'react';
import {Link} from 'react-router-dom';


export default function AccessDenied({name}) {
    return (
        <div className='background-white'>
            <div className='background-login'>
                <h2>{name}</h2>
                <Link to='/login'>
                    <button>
                        <i className='fa fa-user' style={{marginRight: '0.4rem'}}></i>Login
                    </button>
                </Link>
                <Link to='/register'>
                    <button>
                        <i className='fa fa-user-plus' style={{marginRight: '0.4rem'}}></i>Register
                    </button>
                </Link>
            </div>
        </div>
    )
}

import React from 'react';
import { signout } from '../helpers/auth';
import { toast } from 'react-toastify';


export default function Navbar({username}) {
    return (
        <div className='header'>
            <h3>{username}</h3>
            <div className='header-btn'>
                <button>
                    <a href='/'>Home</a>
                </button>
                <button>
                    <a href='/product/upload'>Upload</a>
                </button>
                <button
                    onClick={() => {
                        signout(() => {
                            toast.success('Signout successful');
                        });
                    }}
                >
                    <a href='/'>Signout</a>
                </button>
                
            </div>
        </div>
    )
}

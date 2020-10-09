import React, { useState, useEffect } from 'react';
import { isAuth } from '../helpers/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../travel-project/Navbar';
import AccessDenied from './AccessDenied';
import CheckboxContinent from '../travel-project/utility/CheckboxContinent';


export default function Home({match}) {
    const [Products, setProducts] = useState([]);
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        let userId = localStorage.user;
        if(localStorage.length){
            //Get logged user
            axios.get(`/users/${userId.replace(/['"]+/g, '')}`)
                .then(res => {
                    setUserData({
                        id: res.data._id,
                        username: res.data.username,
                        email: res.data.email
                    })
                })
                .catch(err => toast.error(err.response.data.error));
        }

        axios.get('/products/getProducts')
            .then(res => {
                if(res.data.success){
                    setProducts(res.data.products);
                } else {
                    alert(res.data.err)
                }
            })
    }, [match.params]);

    const productCard = Products.map((product, i) => (
        <div className='travel-grid-card' key={i}>
            <img src={product.images[0]} alt='product' key={i}/>
            <h3>{product.title}</h3>
            <p>&euro; {product.price}</p>
        </div>
    ));

    const handleFilters = (filters, category) => {
        
    }

    return (
        <div className='background'>
            {isAuth() ?
                <React.Fragment>
                    <Navbar username={`Welcome, ${userData.username}`}/>
                    <h1 className='travel-anywhere'>Travel Anywhere<i className="fa fa-space-shuttle fa-lg"></i></h1>
                    <CheckboxContinent
                        handleFilters={filters => handleFilters(filters, 'continents')}
                    />
                    {(Products.length === 0) ?
                        <div className='travel-flex'>
                            <h1 style={{color: '#fff'}}>No posts yet...</h1>
                        </div>
                        :
                        <div className='travel-flex'>
                            <div className='travel-grid'>
                                {productCard}
                            </div>
                            <button>Load More</button>
                        </div>
                    }
                </React.Fragment>
                    :
                <AccessDenied name={'Login or register to access the content!'}/>
            }
        </div>
    )
}

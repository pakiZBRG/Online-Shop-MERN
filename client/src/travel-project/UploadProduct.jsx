import React, {useState} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {isAuth} from '../helpers/auth';
import AccessDenied from '../components/AccessDenied'
import FileUpload from './utility/FileUpload';


export default function UploadProduct({history}) {
    const continents = [
        {id: 1, value: "Europe"},
        {id: 2, value: "Africa"},
        {id: 3, value: "Asia"},
        {id: 4, value: "South America"},
        {id: 5, value: "North America"},
        {id: 6, value: "Australia"},
        {id: 7, value: "Antarctica"}
    ];

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState(1);
    const [Images, setImages] = useState([]);

    const titleChange = e => setTitle(e.target.value);
    const descriptionChange = e => setDescription(e.target.value);
    const priceChange = e => setPrice(e.target.value);
    const continentChange = e => setContinent(e.target.value);
    const updateImages = images => setImages(images);

    const submitForm = e => {
        e.preventDefault();
        if(!Title || !Description || !Price || !Continent || !Images){
            alert('Fill all the fields')
        }
        else {
            const product = {
                writer: localStorage.getItem('user').replace(/['"]+/g, ''),
                title: Title,
                description: Description,
                price: Price,
                images: Images,
                continent: Continent
            }
    
            axios.post('/products/uploadProduct', product)
                .then(res => {
                    if(res.data.success) {
                        console.log('Product successfuly uploaded');
                        history.push('/');
                    } else {
                        alert(res.data.err);
                    }
                })
        }
        
    }

    return (
        <div className='background'>
            {isAuth() ?
            <React.Fragment>
                <Navbar username={'Travel Agency'}/>
                <div className='upload'>
                    <h2>Upload Product</h2>
                    <form
                        className='upload-form'
                        onSubmit={submitForm}
                    >
                        <FileUpload updateImages={updateImages}/>
                        <label htmlFor='title'>Title</label>
                        <input
                            onChange={titleChange}
                            name='title'
                            value={Title}
                            type='text'
                            autoComplete='off'
                        />
                        <label htmlFor='description'>Description</label>
                        <textarea
                            onChange={descriptionChange}
                            name='description'
                            value={Description}
                            type='text'
                            autoComplete='off'
                        />
                        <label htmlFor='price'>Price (&euro;)</label>
                        <input
                            onChange={priceChange}
                            name='price'
                            value={Price}
                            type='number'
                            autoComplete='off'
                        />
                        <select onChange={continentChange} value={Continent}>
                            {continents.map(({id, value}) => (
                                <option key={id} value={value}>{value}</option>
                            ))}
                        </select>
                        <button className='submit-form'>
                            Submit
                        </button>
                    </form>
                </div>
            </React.Fragment> 
            :
            <AccessDenied name={'Access denied to unauthorized users!'}/>
            }
        </div>
    )
}
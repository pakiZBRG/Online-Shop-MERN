import React, {useState} from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';


export default function FileUpload({updateImages}) {
    const [Images, setImages] = useState([]);

    const onDrop = files => {
        let formData = new FormData();
        formData.append('file', files[0]);
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }

        axios.post('/products/imageUpload', formData, config)
            .then(res => {
                if(res.data.success){
                    setImages([...Images, res.data.image]);
                    updateImages([...Images, res.data.image]);
                } else {
                    alert(res.data.err.message || res.data.err);
                }
            })
    }

    const deleteImg = image => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        updateImages(newImages);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DropZone
                onDrop={onDrop}
                multiple={false}
            >
                {({getRootProps, getInputProps}) => (
                    <div className='upload-files' {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <i className="fa fa-plus fa-4x" style={{color: '#5e2bbd', cursor: 'pointer'}}></i>
                    </div>
                )}
            </DropZone>

            <div className='uploaded-files'>
                {Images.map((image, i) =>(
                    <div key={i} onClick={() => deleteImg(image)}>
                        <img src={`http://localhost:5000/${image}`} alt={`img-${i}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

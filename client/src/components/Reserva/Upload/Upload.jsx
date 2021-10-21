import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
import {Image} from 'cloudinary-react';
import { createimage } from '../../../actions';

export default function Upload(){
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedUrl, setSelectedUrl] = useState('')

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append('file', selectedImage)
        formData.append('upload_preset', 'bxxbrwfk')

        Axios.post('https://api.cloudinary.com/v1_1/vt-cabin/image/upload', formData)
        .then((response)=>{
        })
    }

    return (
        <div>
            <input type="file" 
            onChange={(e)=>{
                setSelectedImage(e.target.files[0])
                
            }}
            name="Url"
            />
            <button onClick={uploadImage}>Upload</button>

            
            
        </div>
    )
} 
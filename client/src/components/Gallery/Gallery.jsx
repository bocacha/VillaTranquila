import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import styles from "./Gallery.module.css";
import { Link } from 'react-router-dom';
import Modall from './Modal';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';

export default function Gallery() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await axios.get('/pictures');
            const data = res.data;

            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div className={styles.slidershow}>
            <Navbar />
            <div className={styles.slides}>
                {imageIds?.map((imageId, index) => {
                    return (
                        <div className={styles.wrapper}>
                            <img
                                className={styles.img}
                                src={imageId.Url}
                                width="100px"
                                value={imageId.Description} alt=""
                            />
                            <Modall className={styles.modal} url={imageId.Url} description={imageId.Description} from={imageId.CabainNumber} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
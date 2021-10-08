import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import styles from "./Gallery.module.css";
import { Link } from 'react-router-dom';
import Modall from './Modal';

export default function Gallery() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:3001/pictures');
            const data = await res.json();

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
            <div className={styles.slides}>
                {imageIds?.map((imageId, index) => (
                    <div className={styles.wrapper}>
                        <img
                            className={styles.img}
                            src={imageId.Url}
                            width="200px"
                            value={imageId.Description} alt=""
                        />
                        <Modall className={styles.modal} url={imageId.Url} description={imageId.Description}/>
                    </div>
                ))}
            </div>
            <div className={styles.btnVolver}>
                <Link to="/">
                    <button className={styles.btn}>Volver</button>
                </Link>
            </div>

            
        </div>
    );
}
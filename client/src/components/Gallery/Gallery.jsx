import React, { useEffect, useState } from 'react';
import  {Image}  from 'cloudinary-react';
import styles from "./Gallery.module.css";

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
                        <img 
                        className={styles.img}
                        src={imageId.Url}
                        width="200px"
                        />                  
                    ))}
            </div> 
            
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import  {Image}  from 'cloudinary-react';

export default function Gallery() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:3001/showImages/images');
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
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {/* {imageIds && */}
                {imageIds?.map((imageId, index) => (
                        <Image
                            key={index}
                            // cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            cloudName={'villatranquila'}
                            publicId={imageId}
                            width="300"
                            height="200"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}
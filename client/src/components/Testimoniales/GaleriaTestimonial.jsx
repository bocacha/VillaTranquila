import React from 'react';
import { useSelector } from 'react-redux';


const GaleriaTestimonial = () => {
    const allTestimonials = useSelector((state) => state.testimoniales);
    console.log('all',allTestimonials);
    return ( 
        <div>
            {
            allTestimonials.map((expe)=>{
              return  <div> 
                    <h3>Nombre : {expe.name} </h3>
                    <p>Descripcion : {expe.description} </p> 
                </div>
                })
            }
           
        </div>
     );
}
 
export default GaleriaTestimonial;
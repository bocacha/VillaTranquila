import React, {useState} from 'react';
import TestimonialForm from './TestimonialForm';



const Testimoniales = () => {
    const [ver, setVer] = useState(true)
    return (
        <div>
            {ver ?
                <button onClick={()=>{setVer(false)}}>Contanos como te fue</button>  
             : 
                    <TestimonialForm />} 
        </div>
      );
}
 
export default Testimoniales;
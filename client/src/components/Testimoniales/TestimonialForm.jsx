import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTestimonials, Logeduser } from "../../actions";
import style from './testimonial.module.css';
import ReactStars from "react-rating-stars-component";
import { useHistory } from 'react-router-dom';



const TestimonialForm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [input, setInput] = useState({
        name : '',
        description :'',
    })
    useEffect(() => {
        dispatch(Logeduser());
      }, [dispatch]);
    const logeduser = useSelector((state) => state.user);
    const { token } = logeduser;
   
    
    const {name, description, } = input;
    const handleChange = (e)=>{
         setInput({
            ...input,
                [e.target.name] : e.target.value
        });
        
    } 
    const [stars, setStars ]= useState(0);
    const ratingChanged = (stars) =>{
        setStars(stars)
    }
    const handleClicks = (e)=> {
       e.preventDefault();
       dispatch(postTestimonials({...input, stars}, {token}))
        history.push("/testimonial");
    }
    return (
    <div>
        <h2>Contanos Tu experiencia</h2>
        <form className={style.container}>
            <label>Nombre</label>
            <input 
                type="text" 
                name="name" 
                value={name} 
                onChange={handleChange} />
            <label>Descripcion</label>
            <textarea 
                cols="30" 
                rows="10" 
                name="description"
                maxlength="140"
                value={description} 
                onChange={handleChange}>
            </textarea>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
             />
          
                <button onClick={(e)=>handleClicks(e)}>Enviar</button>
           
        </form>
    </div>  );
}


  
 
export default TestimonialForm;
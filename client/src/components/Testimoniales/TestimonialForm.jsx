import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTestimonials } from "../../actions";


const TestimonialForm = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name : '',
        description :'',
    })
   
    const {name, description} = input;
    const handleChange = (e)=>{
         setInput({
            ...input,
                [e.target.name] : e.target.value
        });
    } 
    

    
    const handleClick = (e)=> {
       e.preventDefault();
       dispatch(getTestimonials(input)) 
     

    }
    return (<div>
        <h2>Contanos Tu experiencia</h2>
        <form>
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
                value={description} 
                onChange={handleChange}>
            </textarea>
            <button onClick={(e)=>handleClick(e)}>Enviar</button>
        </form>
    </div>  );
}
 
export default TestimonialForm;
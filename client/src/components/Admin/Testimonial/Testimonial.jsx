import React, {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {getTestimonials} from "../../../actions";
import style from '../Testimonial/TestimonialAdmin.module.css';



const Testimonial = () => {

    const allTestimonials = useSelector((state) => state.testimoniales);
    const allUsersData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTestimonials());
      }, [dispatch]);
      var array = [1,2,3,4,5]
    return (
        <div>
        {allTestimonials.length !== 0 
        ?
        <div>
        {
         allTestimonials.map((expe, id)=>{
           
          return (
              <div>
          <div key={id} className={style.container}>
            <h3>Nombre : {expe.Name} </h3>
            <p>Descripcion : {expe.Description} </p> 
            <div className={style.arrayStar}>
            {array.map((la)=>{
                return ( 
                <div>
                    {(la<=allTestimonials[id].Stars) ?
                        <div  className={style.paint}><p>★</p></div> 
                    :
                        <div><p>☆</p></div>}
                </div>)

            })}
            </div>
         </div>
         <div>
            <button>Ocultar</button>
        </div>  
        </div>
         ) 
        })}
       
       
        </div>
        :
        <div>
            <h3>No hay testimoniales para mostrar</h3>
            
        </div>    
        }
    </div>
      );
}
 
export default Testimonial;
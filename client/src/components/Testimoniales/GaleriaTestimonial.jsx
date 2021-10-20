import React, {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import style from './testimonial.module.css';
import {getTestimonials} from "../../actions";
import { useHistory } from 'react-router-dom';

const GaleriaTestimonial = () => {
    const allTestimonials = useSelector((state) => state.testimoniales);
    let history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTestimonials());
      }, [dispatch]);
    const handleVolver = (e)=>{
        e.preventDefault(e);
        history.push("/");
    }
  
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
                
            </div>
             ) 
            })}
            <div>
                <button onClick={handleVolver}>Volver</button>
            </div>
           
            </div>
            :
            <div>
                <h3>No hay testimoniales para mostrar</h3>
                <div>
                    <button onClick={handleVolver}>Volver</button>
                </div>
            </div>    
            }
        </div>
       
     );
}
 
export default GaleriaTestimonial;
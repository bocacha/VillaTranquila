import React, {useEffect, useState} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {getTestimonials, removeFeedback, restoreFeedback, readFeedbackocultados} from "../../../actions";
import styles from '../Testimonial/TestimonialAdmin.module.css';
import {useHistory} from 'react-router-dom';
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";


const Testimonial = () => {

    const allTestimonials = useSelector((state) => state.testimoniales);
    const [habilitar, setHabilitar] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTestimonials());
      }, [dispatch]);
      var array = [1,2,3,4,5]
      
      const handleSubmitDelete = (ID) => {
        dispatch(removeFeedback({ id: ID }));
        alert("su Reseña fue Eliminada con exito");
        setTimeout(function () {
          history.go(0);
        }, 500)
    
      };

      const handleSubmitrestore = (ID) => {
        console.log('funcion', ID)
        dispatch(restoreFeedback({ id: ID }));
        alert("su reseña fue restaurada con exito");
        setTimeout(function () {
          history.go(0);
        }, 500)
      }

      const ocultadas = () => {
        dispatch(readFeedbackocultados());
        setHabilitar(true);
      };
      const showtrue = () => {
        dispatch(getTestimonials());
        setHabilitar(false);
      };
    return (
        
        <div>
          <div className={styles.navs2}>
            <div className={styles.navs}>
              <Navbar />
              <NavAdmin  className={styles.navAdmin}/>
            </div>
            <div className={styles.navRsp}>
              <Navbar />
            </div>
          </div>
         {!habilitar?
          <button onClick={()=>ocultadas()}>Mostrar Ocultas</button> 
          :
          <button onClick={()=>showtrue()}>Mostrar Habilitadas</button>
        } 
        {allTestimonials.length !== 0 
        ?
        <div>
        {
         allTestimonials.map((expe, i)=>{
           
          return (
              <div>
          <div key={i} className={styles.container}>
            <h3>Nombre : {expe.Name} </h3>
            <p>Descripcion : {expe.Description} </p> 
            <div className={styles.arrayStar}>
            {array.map((la)=>{
                return ( 
                <div>
                    {(la<=allTestimonials[i].Stars) ?
                        <div  className={styles.paint}><p>★</p></div> 
                    :
                        <div><p>☆</p></div>}
                </div>)

            })}
            </div>
         </div>
         {!habilitar
         ?
         <div>
            <button onClick={()=>handleSubmitDelete(expe.ID)}>Ocultar</button>
         </div> 
         :
         <div>
            <button onClick={()=>handleSubmitrestore(expe.ID)}>Restaurar</button>
         </div> 
         }
        
        </div>
         ) 
        })}
       
       
        </div>
        :
        <div>
            <h3>No hay Reseñas para mostrar</h3>
            
        </div>    
        }
    </div>
  
      );
}
 
export default Testimonial;
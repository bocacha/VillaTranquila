import React, {useState} from "react";
import styles from "./ServiciosDetail.module.css";
import { useDispatch } from "react-redux";
import {removeServices, restoreServices}  from '../../../actions'

export default function ServiciosDetail({ ID, Name, Description, Price, handleSubmitEdit,handlePrueba,restaurar }) {

  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("se servicio fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removeServices(obj));
    window.location.reload();
  }
  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(restoreServices(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>Description:</strong> {Description}</p>
      <p><strong>Price:</strong> {Price}</p>  
      <div>
      {!restaurar?(
          <button onClick={()=>handleSubmitDelete(ID)}  className={styles.btn}>Eliminar</button>

        ):(
          <button onClick={()=>handleSubmitrestore(ID)}  className={styles.btn}>Restaurar</button>
        )}
      </div>
      {mostrar 
      
      ?  
      <div>
         <button onClick={(e)=> {handleSubmitEdit(e,ID);
                                      setMostrar(false);
                                      ;        } 
        }>Editar</button>
      </div> 
        
      :
       <div>
          <button onClick={(e)=>handlePrueba(e,ID)}>Guardar</button>
       </div> 
      
      }

    </div>
  );
}

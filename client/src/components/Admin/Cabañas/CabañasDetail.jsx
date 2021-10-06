import React, {useState} from "react";
import styles from "./CabañasDetail.module.css";
import { useDispatch} from "react-redux";
import {removeCabains,restoreCabains}  from '../../../actions'


export default function CabinsDetail({ 
    ID,
    Number,
    Capacity,
    Available,
    Price,
    Description,
    Barbecue,
    Wifi,
    Parking,
    handleeditSubmit,
    handlePrueba,
    restaurar
}) {
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID)=>{
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removeCabains(obj));
    window.location.reload();
  }
  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(restoreCabains(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong>  {ID} </p>
      <p><strong>Numero de Cabaña:</strong> {Number}</p>
      <p><strong>Camas:</strong>  {Capacity}</p>
      <p><strong>Available:</strong>  {Available}</p>
      <p><strong>Price:</strong>  {Price}</p>
      <p><strong>Descripcion:</strong>  {Description}</p>
      <p><strong>Barbecue:</strong>  {Barbecue?<span>si</span>:<span>no</span>}</p>
      <p><strong> Wifi:</strong> {Wifi?<span>si</span>:<span>no</span>}</p>
      <p><strong>Parking:</strong>  {Parking?<span>si</span>:<span>no</span>}</p>
      <div>
        {!restaurar?(
          <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>

        ):(
          <button onClick={()=>handleSubmitrestore(ID)}>Restaurar</button>
        )}
      </div>
      {mostrar      
      ?  
      <div>
         <button onClick={(e)=> {handleeditSubmit(e,ID);
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

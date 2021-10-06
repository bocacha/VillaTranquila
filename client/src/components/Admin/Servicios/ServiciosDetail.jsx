import React from "react";
import styles from "./Servicios.module.css";
import { useDispatch } from "react-redux";
import {removeServices, restoreServices}  from '../../../actions'

export default function ServiciosDetail({ ID, Name, Description, Price,restaurar }) {

  const dispatch = useDispatch();

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
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>Description:</strong> {Description}</p>
      <p><strong>Price:</strong> {Price}</p>  
      <div>
      {!restaurar?(
          <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>

        ):(
          <button onClick={()=>handleSubmitrestore(ID)}>Restaurar</button>
        )}
      </div>
    </div>
  );
}

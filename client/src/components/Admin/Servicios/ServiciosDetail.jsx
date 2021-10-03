import React from "react";
import styles from "./Servicios.module.css";
import { useDispatch } from "react-redux";
import {removeServices}  from '../../../actions'

export default function ServiciosDetail({ ID, Name, Description, Price }) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("se servicio fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removeServices(obj));
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>Description:</strong> {Description}</p>
      <p><strong>Price:</strong> {Price}</p>  
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

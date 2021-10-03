import React from "react";
import styles from "./Cabañas.module.css";
import { useDispatch } from "react-redux";
import {removeCabains}  from '../../../actions'

export default function CabinsDetail({ 
    ID,
    Number,
    Capacity,
    Available,
    Price,
    Description,
    Coffe,
    Microondas,
    Calefaccion,
    Barbecue,
    Wifi,
    Cleaning,
    Refrigerator,
    Stove,
    Parking

}) {
  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removeCabains(obj));
  }
  return (
    <div className={styles.container}>
      <p>ID: {ID} </p>
      <p>Number: {Number}</p>
      <p>Capacity: {Capacity}</p>
      <p>Available: {Available}</p>
      <p>Price: {Price}</p>
      <p>Descripcion: {Description}</p>
      <p>Coffe: {Coffe?<span>si</span>:<span>no</span>}</p>
      <p>Microondas: {Microondas?<span>si</span>:<span>no</span>}</p>
      <p>Calefaccion: {Calefaccion?<span>si</span>:<span>no</span>}</p>
      <p>Barbecue: {Barbecue?<span>si</span>:<span>no</span>}</p>
      <p>Wifi: {Wifi?<span>si</span>:<span>no</span>}</p>
      <p>Cleaning: {Cleaning?<span>si</span>:<span>no</span>}</p>
      <p>Refrigerator: {Refrigerator?<span>si</span>:<span>no</span>}</p>
      <p>Stove: {Stove?<span>si</span>:<span>no</span>}</p>
      <p>Parking: {Parking?<span>si</span>:<span>no</span>}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
    
  );
}

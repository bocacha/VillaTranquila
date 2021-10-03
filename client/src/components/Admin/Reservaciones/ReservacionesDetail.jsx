import React from "react";
import styles from "./ReservacionesDetail.module.css";
import { useDispatch } from "react-redux";
import {removeReservations}  from '../../../actions'

export default function ReservacionesDetail({
  ID,
  Checkin,
  Checkout,
  UserId,
  Paymentsid,
  Cabinid,
  ExtraServices,
}) {

 const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Reserva fue Eliminada con exito");
    let obj = {id:ID};
    dispatch(removeReservations(obj));
  } 
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Checkin: {Checkin}</p>
      <p>Checkout: {Checkout}</p>
      <p>UserId: {UserId}</p>
      <p>Paymentsid: {Paymentsid}</p>
      <p>Cabinid: {Cabinid}</p>
      <p>ExtraServices: {ExtraServices}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

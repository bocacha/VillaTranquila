import React from "react";
import styles from "./ReservacionesDetail.module.css";
import { useDispatch } from "react-redux";
import {removeReservations, restoreReservations}  from '../../../actions'

export default function ReservacionesDetail({
  ID,
  Checkin,
  Checkout,
  UserId,
  Paymentsid,
  Cabinid,
  ExtraServices,
  restaurar
}) {

 const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Reserva fue Eliminada con exito");
    let obj = {id:ID};
    dispatch(removeReservations(obj));
    window.location.reload();
  } 
  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(restoreReservations(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Checkin:</strong> {Checkin}</p>
      <p><strong>Checkout:</strong> {Checkout}</p>
      <p><strong>UserId:</strong> {UserId}</p>
      <p><strong>Paymentsid:</strong> {Paymentsid}</p>
      <p><strong>Cabinid:</strong> {Cabinid}</p>
      <p><strong>ExtraServices:</strong> {ExtraServices}</p>
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

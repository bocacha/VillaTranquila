import React from "react";
import styles from "./PagosDetail.module.css";
import { useDispatch } from "react-redux";
import {removePayments}  from '../../../actions';


export default function PagosDetail({
  ID,
  TotalAmount,
  PaydAmount,
  Date,
  idClient,
}) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su pago fue Eliminado con exito");
    let obj = {id:ID}
    dispatch(removePayments(obj));
  }
  
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Id cliente: {idClient}</p>
      <p>Fecha: {Date}</p>
      <p>Monto inicial: ${PaydAmount}.00</p>
      <p>Monto total: ${TotalAmount}.00</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

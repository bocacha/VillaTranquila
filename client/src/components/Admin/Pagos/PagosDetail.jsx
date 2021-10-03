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
      <p> <strong>Id:</strong>  {ID}</p>
      <p> <strong>Id cliente:</strong>  {idClient}</p>
      <p> <strong>Fecha:</strong>  {Date}</p>
      <p> <strong>Monto inicial:</strong>  ${PaydAmount}.00</p>
      <p> <strong>Monto total:</strong>  ${TotalAmount}.00</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

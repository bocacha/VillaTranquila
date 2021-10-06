import React from "react";
import styles from "./FotosDetail.module.css";
import { useDispatch } from "react-redux";
import {removePictures}  from '../../../actions'

export default function FotosDetail({ Description, Url, ID }) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Foto fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removePictures(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Descripcion:</strong> {Description}</p>
      <p><strong>Url:</strong> {Url}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)} className={styles.btn}>Eliminar</button>
      </div>
    </div>
  );
}

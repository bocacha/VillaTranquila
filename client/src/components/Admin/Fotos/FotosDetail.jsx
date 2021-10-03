import React from "react";
import styles from "./Fotos.module.css";
import { useDispatch } from "react-redux";
import {removePictures}  from '../../../actions'

export default function FotosDetail({ Description, Url, ID }) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Foto fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removePictures(obj));
  }
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Descripcion: {Description}</p>
      <p>Url: {Url}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

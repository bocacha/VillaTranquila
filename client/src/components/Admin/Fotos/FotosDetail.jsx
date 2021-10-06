import React from "react";
import styles from "./FotosDetail.module.css";
import { useDispatch } from "react-redux";
import {removePictures,restorePictures}  from '../../../actions'

export default function FotosDetail({ Description, Url, ID , restaurar}) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Foto fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removePictures(obj));
    window.location.reload();
  }
  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(restorePictures(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Descripcion:</strong> {Description}</p>
      <p><strong>Url:</strong> {Url}</p>
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

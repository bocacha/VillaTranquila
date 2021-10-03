import React from "react";
import styles from "./Usuarios.module.css";
import { useDispatch } from "react-redux";
import {removeUsers}  from '../../../actions'

export default function UsuariosDetail({
    ID,
    UserName,
    UserPassword,
    FirstName,
    LastName,
    Address,
    Phone,
    Email,
}) {

  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su usuario fue Eliminado con exito");
    let obj = {id:ID}
    dispatch(removeUsers(obj));
  }
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>UserName: {UserName}</p>
      <p>UserPassword: {UserPassword}</p>
      <p>FirstName: {FirstName}</p>
      <p>LastName: {LastName}</p>
      <p>Address: {Address}</p>
      <p>Phone: {Phone}</p>
      <p>Email: {Email}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}
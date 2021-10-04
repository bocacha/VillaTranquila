import React from "react";
import styles from "./UsuariosDetail.module.css";
import { useDispatch } from "react-redux";
import {removeUsers}  from '../../../actions'

export default function UsuariosDetail({
    ID,
    UserName,
    Admin,
    FirstName,
    LastName,
    Address,
    Phone,
    Email,
}) {
  if(Admin === true) {
    Admin = "Si";
  } else {
    Admin = "No";
  }
  const dispatch = useDispatch();

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su usuario fue Eliminado con exito");
    let obj = {id:ID}
    dispatch(removeUsers(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>UserName:</strong> {UserName}</p>
      <p><strong>FirstName:</strong> {FirstName}</p>
      <p><strong>LastName:</strong> {LastName}</p>
      <p><strong>Address:</strong> {Address}</p>
      <p><strong>Phone:</strong> {Phone}</p>
      <p><strong>Email:</strong> {Email}</p> 
      <p><strong>Admin:</strong> {Admin}</p> 
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./UsuariosDetail.module.css";

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
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>UserName:</strong> {UserName}</p>
      <p><strong>UserPassword:</strong> {UserPassword}</p>
      <p><strong>FirstName:</strong> {FirstName}</p>
      <p><strong>LastName:</strong> {LastName}</p>
      <p><strong>Address:</strong> {Address}</p>
      <p><strong>Phone:</strong> {Phone}</p>
      <p><strong>Email:</strong> {Email}</p> 
    </div>
  );
}

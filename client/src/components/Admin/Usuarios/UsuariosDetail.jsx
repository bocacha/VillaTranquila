import React from "react";
import styles from "./Usuarios.module.css";

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
      <p>Id: {ID}</p>
      <p>UserName: {UserName}</p>
      <p>UserPassword: {UserPassword}</p>
      <p>FirstName: {FirstName}</p>
      <p>LastName: {LastName}</p>
      <p>Address: {Address}</p>
      <p>Phone: {Phone}</p>
      <p>Email: {Email}</p>
    </div>
  );
}
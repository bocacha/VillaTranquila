import React from "react";
import styles from "./Servicios.module.css";

export default function ServiciosDetail({ ID, Name, Description, Price }) {
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Name: {Name}</p>
      <p>Description: {Description}</p>
      <p>Price: {Price}</p>
    </div>
  );
}

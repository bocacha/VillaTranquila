import React from "react";
import styles from "./Servicios.module.css";

export default function ServiciosDetail({ ID, Name, Description, Price }) {
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>Description:</strong> {Description}</p>
      <p><strong>Price:</strong> {Price}</p>
    </div>
  );
}

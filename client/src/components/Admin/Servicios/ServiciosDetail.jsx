import React from "react";
import styles from "./Servicios.module.css";

export default function ServiciosDetail({
    Name,
    Description,
    Price
}) {
  return (
    <div className={styles.container}>
      <p>Name: {Name}</p>
      <p>Description: {Description}</p>
      <p>Price: {Price}</p>
      
    </div>
  );
}
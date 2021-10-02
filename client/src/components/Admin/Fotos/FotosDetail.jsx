import React from "react";
import styles from "./Fotos.module.css";

export default function FotosDetail({ Description, Url, ID }) {
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Descripcion: {Description}</p>
      <p>Url: {Url}</p>
    </div>
  );
}

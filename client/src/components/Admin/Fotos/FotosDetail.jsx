import React from "react";
import styles from "./Fotos.module.css";

export default function FotosDetail({ Description, Url }) {
  return (
    <div className={styles.container}>
      <p>Descripcion: {Description}</p>
      <p>Url: {Url}</p>
    </div>
  );
}

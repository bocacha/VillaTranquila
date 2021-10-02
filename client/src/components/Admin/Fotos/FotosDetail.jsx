import React from "react";
import styles from "./FotosDetail.module.css";

export default function FotosDetail({ Description, Url, ID }) {
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Descripcion:</strong> {Description}</p>
      <p><strong>Url:</strong> {Url}</p>
    </div>
  );
}

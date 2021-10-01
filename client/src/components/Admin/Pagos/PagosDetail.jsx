import React from "react";
import styles from "./PagosDetail.module.css";

export default function pagosDetail({
  ID,
  TotalAmount,
  PaydAmount,
  Date,
  idClient,
}) {
  return (
    <div className={styles.container}>
      <p>Id: {ID}</p>
      <p>Id cliente: {idClient}</p>
      <p>Fecha: {Date}</p>
      <p>Monto inicial: ${PaydAmount}.00</p>
      <p>Monto total: ${TotalAmount}.00</p>
    </div>
  );
}

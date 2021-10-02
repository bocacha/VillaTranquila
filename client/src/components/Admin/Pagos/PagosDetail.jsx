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
      <p> <strong>Id:</strong>  {ID}</p>
      <p> <strong>Id cliente:</strong>  {idClient}</p>
      <p> <strong>Fecha:</strong>  {Date}</p>
      <p> <strong>Monto inicial:</strong>  ${PaydAmount}.00</p>
      <p> <strong>Monto total:</strong>  ${TotalAmount}.00</p>
    </div>
  );
}

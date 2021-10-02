import React from "react";
import styles from "./ReservacionesDetail.module.css";

export default function reservacionesDetail({
  ID,
  Checkin,
  Checkout,
  UserId,
  Paymentsid,
  Cabinid,
  ExtraServices,
}) {
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>Checkin:</strong> {Checkin}</p>
      <p><strong>Checkout:</strong> {Checkout}</p>
      <p><strong>UserId:</strong> {UserId}</p>
      <p><strong>Paymentsid:</strong> {Paymentsid}</p>
      <p><strong>Cabinid:</strong> {Cabinid}</p>
      <p><strong>ExtraServices:</strong> {ExtraServices}</p>
    </div>
  );
}

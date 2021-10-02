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
      <p>Id: {ID}</p>
      <p>Checkin: {Checkin}</p>
      <p>Checkout: {Checkout}</p>
      <p>UserId: {UserId}</p>
      <p>Paymentsid: {Paymentsid}</p>
      <p>Cabinid: {Cabinid}</p>
      <p>ExtraServices: {ExtraServices}</p>
    </div>
  );
}

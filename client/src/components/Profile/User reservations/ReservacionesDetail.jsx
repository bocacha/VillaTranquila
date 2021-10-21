import React, { useState , useEffect } from "react";
import styles from "./ReservacionesDetail.module.css";
import { useDispatch} from "react-redux";
import { removeReservations, restoreReservations ,readUsers} from "../../../actions";
import {Link} from "react-router-dom"

export default function ReservacionesDetail({
  ID,
  Checkin,
  Checkout,
  CabinNumber,
  UserName,
  Anombrede,
  ExtraServices,
  CostoFinal,
  Cabinid,
  handleSubmitEdit,
  handlePrueba,
  restaurar,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readUsers())
  })
  return (
    <div className={styles.container}>
    <div className={styles.infoContainer}>
      <table>
        <tbody>
          <tr>
            <td className={styles.izquierda}>Nombre de usuario:</td>
            <td className={styles.derecha}>{UserName}</td>
          </tr>
          <tr>
            <td className={styles.izquierda}>Reserva a nombre de:</td>
            <td className={styles.derecha}>{Anombrede}</td>
          </tr>
          <tr>
            <td className={styles.izquierda}>Fecha de llegada:</td>
            <td className={styles.derecha}>{Checkin}</td>
          </tr>
          <tr>
            <td className={styles.izquierda}>Fecha de salida:</td>
            <td className={styles.derecha}>{Checkout}</td>
          </tr>
          <tr>
            <td className={styles.izquierda}>Cabaña número:</td>
            <td className={styles.derecha}>{CabinNumber}</td>
          </tr>
          {
            ExtraServices && ExtraServices.length !== 0 &&
            <tr>
              <td className={styles.izquierda}>Servicios extra:</td>
              <td className={styles.derecha}>
                <ul>
                  {
                    ExtraServices.map(el => <li>{el}</li>)
                  }
                </ul>
              </td>
            </tr>
          }
          <tr>
            <td className={styles.izquierda}>Precio final:</td>
            <td className={styles.derecha}>$ {CostoFinal}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className={styles.btnsContainer}>
      <button
        onClick={(e) => {
          handleSubmitEdit(e,  ID,
            Checkin,
            Checkout,
            CabinNumber,
            UserName,
            Anombrede,
            ExtraServices,
            CostoFinal,
            Cabinid,);
        }}
        className={styles.btnPlus}
      >
        Editar
      </button>
              <Link to="/reserva/pago">
                <button className={styles.btnPlus}>
                  Pagar
                </button>
              </Link>
    </div>
 
  </div>
  );
}

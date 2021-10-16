import React, { useState } from "react";
import styles from "./ReservacionesDetail.module.css";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router";
import { readReservation, removeReservations, restoreReservations,readReservationocultados } from "../../../actions";
import fechas from "../../Reserva/Linkreserva/algoritmofechas"

export default function ReservacionesDetail({
  ID,
  Checkin,
  Checkout,
  CabinNumber,
  UserName,
  Anombrede,
  Paymentsid,
  ExtraServices,
  CostoFinal,
  handleSubmitEdit,
  handlePrueba,
  restaurar,
}) {
  const Available = fechas({Checkin:Checkin, Checkout:Checkout})
  const dispatch = useDispatch();
  const history = useHistory();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID) => {
    dispatch(removeReservations({ id: ID , Available},dispatch));
    alert("su Reserva fue Eliminada con exito");
    setTimeout(function () {
      history.go(0);
    }, 500)
   // window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restoreReservations({ id: ID, Available },dispatch));
    alert("su cabaña fue Restaurada con exito");
    setTimeout(function () {
      history.go(0);
    }, 500)
    // window.location.reload();
  };
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
        {!restaurar ? (
          <button
            onClick={() => handleSubmitDelete(ID)}
            className={styles.btn}
          >
            Ocultar
          </button>
        ) : (
          <button
            onClick={() => handleSubmitrestore(ID)}
            className={styles.btn}
          >
            Restaurar
          </button>
        )}
        <button
          onClick={(e) => {
            handleSubmitEdit(e,  ID,
              Checkin,
              Checkout,
              CabinNumber,
              UserName,
              Anombrede,
              Paymentsid,
              ExtraServices,
              CostoFinal,);
            setMostrar(false);
          }}
          className={styles.btnPlus}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./ReservacionesDetail.module.css";
import { useDispatch } from "react-redux";
import { removeReservations, restoreReservations } from "../../../actions";

export default function ReservacionesDetail({
  ID,
  Checkin,
  Checkout,
  UserId,
  Paymentsid,
  Cabinid,
  ExtraServices,
  CostoFinal,
  handleSubmitEdit,
  handlePrueba,
  restaurar,
}) {
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID) => {
    dispatch(removeReservations({ id: ID }));
    alert("su Reserva fue Eliminada con exito");
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restoreReservations({ id: ID }));
    alert("su cabaña fue Restaurada con exito");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.p}>
          <strong>Checkin:</strong> {Checkin}
        </p>
        <p className={styles.p}>
          <strong>Checkout:</strong> {Checkout}
        </p>
        <p className={styles.p}>
          <strong>UserId:</strong> {UserId}
        </p>
        <p className={styles.p}>
          <strong>Costo final:</strong> {CostoFinal}
        </p>
        <p className={styles.p}>
          <strong>Cabinid:</strong> {Cabinid}
        </p>
        {/* <p><strong>ExtraServices:</strong> {ExtraServices}</p> */}
      </div>
      <div className={styles.btnsContainer}>
        <div>
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
        </div>
        {mostrar ? (
          <div>
            <button
              onClick={(e) => {
                handleSubmitEdit(e, ID,
                  Checkin,
                  Checkout,
                  UserId,
                  Paymentsid,
                  Cabinid,
                  ExtraServices,
                  CostoFinal,);
                setMostrar(false);
              }}
              className={styles.btnPlus}
            >
              Editar
            </button>
          </div>
        ) : (
          <div>
            <button onClick={(e) => handlePrueba(e, ID)} className={styles.btnPlus}>Guardar</button>
          </div>
        )}
      </div>
    </div>
  );
}

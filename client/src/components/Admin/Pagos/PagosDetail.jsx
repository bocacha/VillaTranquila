import React, { useState } from "react";
import styles from "./PagosDetail.module.css";
import { useDispatch } from "react-redux";
import { removePayments, restorePayments } from "../../../actions";

export default function PagosDetail({
  ID,
  user,
  status,
  status_detail,
  transaction_detail,
  id_reserva,
  fecha,
  handleSubmitEdit,
  handlePrueba,
  restaurar,
}) {
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID) => {
    dispatch(removePayments({ id: ID }));
    alert("su pago fue Eliminado con exito");
    //window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restorePayments({ id: ID }));
    alert("su cabaña fue Restaurada con exito");
   // window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.p}>
          {" "}
          <strong>Id cliente:</strong> {user}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Estado:</strong> {status}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Detalles del Estado:</strong> {status_detail}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Fecha:</strong> {fecha}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>PagoTotal:</strong> ${transaction_detail.pagoTotal}.00
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Pago Neto:</strong> ${transaction_detail.pagoNeto}.00
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Id Reserva:</strong> {id_reserva}
        </p>
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
      </div>
    </div>
  );
}

// "ID": "472cee18-cffd-422b-8359-85f2eb0f5c3a",
//         "user": "joakinAdmin1",
//         "status": "approved",
//         "status_detail": "accredited",
//         "transaction_detail": {
//             "pagoTotal": 4444,
//             "pagoNeto": 4347.57
//         },
//         "id_reserva": "a3eace8e-014b-4a7c-9bc8-f5b1e03b14bd",
//         "fecha": "2021-10-15T19:04:00.912-04:00",
//         "Show": true
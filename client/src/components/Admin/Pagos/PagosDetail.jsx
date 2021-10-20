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
        <table>
          <tbody>
            <tr>
              <td className={styles.izquierda}><strong>ID Cliente:</strong></td>
              <td className={styles.derecha}>{user}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Estado:</strong></td>
              <td className={styles.derecha}>{status}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Detalles del estado:</strong></td>
              <td className={styles.derecha}>{status_detail}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Fecha:</strong></td>
              <td className={styles.derecha}>{fecha.slice(0,10).split("-").reverse().join("/")}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Pago total:</strong></td>
              <td className={styles.derecha}>$ {transaction_detail.pagoTotal}.-</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Pago neto:</strong></td>
              <td className={styles.derecha}>$ {transaction_detail.pagoNeto}.-</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>ID Reserva:</strong></td>
              <td className={styles.derecha}>{id_reserva}</td>
            </tr>
          </tbody>
        </table>
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
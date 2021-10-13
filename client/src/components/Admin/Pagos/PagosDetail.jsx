import React, { useState } from "react";
import styles from "./PagosDetail.module.css";
import { useDispatch } from "react-redux";
import { removePayments, restorePayments } from "../../../actions";

export default function PagosDetail({
  ID,
  TotalAmount,
  PaydAmount,
  Date,
  idClient,
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
          <strong>Id cliente:</strong> {idClient}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Fecha:</strong> {Date}
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Monto inicial:</strong> ${PaydAmount}.00
        </p>
        <p className={styles.p}>
          {" "}
          <strong>Monto total:</strong> ${TotalAmount}.00
        </p>
      </div>
      <div className={styles.btnsContainer}>
        <div>
          {!restaurar ? (
            <button
              onClick={() => handleSubmitDelete(ID)}
              className={styles.btn}
            >
              Eliminar
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
                  TotalAmount,
                  PaydAmount,
                  Date,
                  idClient);
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

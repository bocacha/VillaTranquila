import React, { useState } from "react";
import styles from "./UsuariosDetail.module.css";
import { useDispatch } from "react-redux";
import { removeUsers, restoreUsers } from "../../../actions";

export default function UsuariosDetail({
  ID,
  UserName,
  Admin,
  FirstName,
  LastName,
  Address,
  Phone,
  Email,
  handlePrueba,
  handleSubmitEdit,
  restaurar,
}) {
  if (Admin === true) {
    Admin = "Si";
  } else {
    Admin = "No";
  }
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID) => {
    console.log("funcion", ID);
    alert("su usuario fue Eliminado con exito");
    let obj = { id: ID };
    dispatch(removeUsers(obj));
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    console.log("funcion", ID);
    alert("su cabaña fue Eliminada con exito");
    let obj = { id: ID };
    dispatch(restoreUsers(obj));
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.p}>
          <strong>UserName:</strong> {UserName}
        </p>
        <p className={styles.p}>
          <strong>FirstName:</strong> {FirstName}
        </p>
        <p className={styles.p}>
          <strong>LastName:</strong> {LastName}
        </p>
        <p className={styles.p}>
          <strong>Address:</strong> {Address}
        </p>
        <p className={styles.p}>
          <strong>Phone:</strong> {Phone}
        </p>
        <p className={styles.p}>
          <strong>Email:</strong> {Email}
        </p>
        <p className={styles.p}>
          <strong>Admin:</strong> {Admin}
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
                handleSubmitEdit(e, ID);
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

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
    dispatch(removeUsers({ id: ID }));
    alert("su usuario fue Eliminado con exito");
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restoreUsers({ id: ID }));
    alert("su cabaña fue Restaurada con exito");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <table>
          <tbody>
            <tr>
              <td className={styles.izquierda}><strong>Nombre de usuario:</strong></td>
              <td className={styles.derecha}><p>{UserName}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Nombre:</strong></td>
              <td className={styles.derecha}><p>{FirstName}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Apellido:</strong></td>
              <td className={styles.derecha}><p>{LastName}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Dirección:</strong></td>
              <td className={styles.derecha}><p>{Address}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Teléfono:</strong></td>
              <td className={styles.derecha}><p>{Phone}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Email:</strong></td>
              <td className={styles.derecha}><p>{Email}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Admin:</strong></td>
              <td className={styles.derecha}><p>{Admin}</p></td>
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
            Bloquear
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
            handleSubmitEdit(e, ID,
              UserName,
              Admin,
              FirstName,
              LastName,
              Address,
              Phone,
              Email);
            setMostrar(false);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
          className={styles.btnPlus}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./ServiciosDetail.module.css";
import { useDispatch } from "react-redux";
import { removeServices, restoreServices } from "../../../actions";

export default function ServiciosDetail({
  ID,
  Name,
  Description,
  Price,
  handleSubmitEdit,
  handlePrueba,
  restaurar,
}) {
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);

  const handleSubmitDelete = (ID) => {
    dispatch(removeServices({ id: ID }));
    alert("el servicio fue eliminado con exito");
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restoreServices({ id: ID }));
    alert("su cabaña fue Restaurada con exito");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <table>
          <tbody>
            <tr>
              <td className={styles.izquierda}><strong>Nombre:</strong></td>
              <td className={styles.derecha}><p>{Name}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Descripción:</strong></td>
              <td className={styles.derecha}><p id={styles.description}>{Description}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Precio:</strong></td>
              <td className={styles.derecha}><p>$ {Price}</p></td>
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
            handleSubmitEdit(e, ID,
              Name,
              Description,
              Price);
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

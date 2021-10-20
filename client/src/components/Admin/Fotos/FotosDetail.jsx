import React, { useState } from "react";
import styles from "./FotosDetail.module.css";
import { useDispatch } from "react-redux";
import { removePictures, restorePictures } from "../../../actions";

export default function FotosDetail({
  Description,
  CabainNumber,
  Url,
  ID,
  handlePrueba,
  handleSubmitEdit,
  restaurar,
}) {
  const dispatch = useDispatch();

  const [mostrar, setMostrar] = useState(true);

  const handleSubmitDelete = (ID) => {
    dispatch(removePictures({ id: ID }));
    alert("su Foto fue Eliminada con exito");
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    dispatch(restorePictures({ id: ID }));
    alert("su cabaña fue Restaurada con exito");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <table>
          <tbody>
            <tr>
              <td className={styles.izquierda}>
                <strong>Descripción:</strong>
              </td>
              <td className={styles.derecha}>{Description}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}>
                <strong>Imagen de cabaña N°:</strong>
              </td>
              <td className={styles.derecha}>{CabainNumber}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}>
                <strong>Url:</strong>
              </td>
              <td className={styles.derecha}>
                <p id={styles.url}>{Url}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <img
        onClick={() => console.log("edit")}
        className={styles.img}
        src={Url}
        alt="img"
      />
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
        <div>
          <button
            onClick={(e) => {
              handleSubmitEdit(e, Description, CabainNumber, Url, ID);
              setMostrar(false);
            }}
            className={styles.btnPlus}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

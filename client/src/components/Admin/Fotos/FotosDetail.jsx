import React, { useState } from "react";
import styles from "./FotosDetail.module.css";
import { useDispatch } from "react-redux";
import { removePictures, restorePictures } from "../../../actions";

export default function FotosDetail({
  Description,
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
        <p className={styles.p}>
          <strong>Descripcion: </strong> {Description}
        </p>
        <p className={styles.p}>
          {Url}
        </p>
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
        {mostrar ? 
          <div>
                  <button onClick={(e)=> {handleSubmitEdit(e, Description,
  Url,ID);
                                      setMostrar(false);
                                      ;        } 
        } className={styles.btnPlus} >Editar</button>
          </div> 
          :
          <div>
            <button onClick={(e) => handlePrueba(e, ID)} className={styles.btnPlus}>Guardar</button>
          </div>
        }
      </div>
    </div>
  );
}

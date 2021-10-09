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
    console.log("funcion", ID);
    alert("su Foto fue Eliminada con exito");
    let obj = { id: ID };
    dispatch(removePictures(obj));
    window.location.reload();
  };
  const handleSubmitrestore = (ID) => {
    console.log("funcion", ID);
    alert("su cabaña fue Eliminada con exito");
    let obj = { id: ID };
    dispatch(restorePictures(obj));
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
                  <button onClick={(e)=> {handleSubmitEdit(e,ID);
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

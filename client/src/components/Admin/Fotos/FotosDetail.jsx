import React, {useState} from "react";
import styles from "./FotosDetail.module.css";
import { useDispatch } from "react-redux";
import {removePictures}  from '../../../actions'

export default function FotosDetail({
    Description,
    Url,
    ID,
    handlePrueba,
    handleSubmitEdit 
  }) {

  const dispatch = useDispatch();

  const [mostrar, setMostrar] = useState(true);

  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su Foto fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(removePictures(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Descripcion:</strong> {Description}</p>
      <p><strong>Url:</strong> {Url}</p>
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
      {mostrar ?
          <div>
              <button onClick={(e)=>{{handleSubmitEdit(e, ID);
                                      setMostrar(false);
              } }}>Editar</button>
          </div> 
          :
          <div>
              <button onClick={(e)=>handlePrueba(e,ID)}>Guardar</button>
          </div> 
          }
    </div>
  );
}

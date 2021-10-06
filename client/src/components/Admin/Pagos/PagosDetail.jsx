import React, {useState} from "react";
import styles from "./PagosDetail.module.css";
import { useDispatch } from "react-redux";
import {removePayments, restorePayments}  from '../../../actions';


export default function PagosDetail({
  ID,
  TotalAmount,
  PaydAmount,
  Date,
  idClient,
  handleSubmitEdit,
  handlePrueba,
  restaurar
}) {

  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su pago fue Eliminado con exito");
    let obj = {id:ID}
    dispatch(removePayments(obj));
    window.location.reload();
  }
  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue Eliminada con exito");
    let obj = {id:ID}
    dispatch(restorePayments(obj));
    window.location.reload();
  }
  
  return (
    <div className={styles.container}>
      <p> <strong>Id:</strong>  {ID}</p>
      <p> <strong>Id cliente:</strong>  {idClient}</p>
      <p> <strong>Fecha:</strong>  {Date}</p>
      <p> <strong>Monto inicial:</strong>  ${PaydAmount}.00</p>
      <p> <strong>Monto total:</strong>  ${TotalAmount}.00</p>
      <div>
      {!restaurar?(
          <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>

        ):(
          <button onClick={()=>handleSubmitrestore(ID)}>Restaurar</button>
        )}
      </div>
    {mostrar 
      ?
      <div>
             <button onClick={(e)=> {handleSubmitEdit(e,ID);
              setMostrar(false);}}>
      Editar</button>
     </div> 
     :
     <div>
          <button onClick={(e)=>handlePrueba(e,ID)}>Guardar</button>
    </div> 
    }
    </div>
  );
}

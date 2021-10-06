import React, {useState} from "react";
import styles from "./UsuariosDetail.module.css";
import { useDispatch } from "react-redux";
import {removeUsers}  from '../../../actions'

export default function UsuariosDetail({
    ID,
    UserName,
    UserPassword,
    FirstName,
    LastName,
    Address,
    Phone,
    Email,
    handlePrueba,
    handleSubmitEdit
}) {

  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID)=>{
    console.log('funcion', ID)
    alert("su usuario fue Eliminado con exito");
    let obj = {id:ID}
    dispatch(removeUsers(obj));
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <p><strong>Id:</strong> {ID}</p>
      <p><strong>UserName:</strong> {UserName}</p>
      <p><strong>UserPassword:</strong> {UserPassword}</p>
      <p><strong>FirstName:</strong> {FirstName}</p>
      <p><strong>LastName:</strong> {LastName}</p>
      <p><strong>Address:</strong> {Address}</p>
      <p><strong>Phone:</strong> {Phone}</p>
      <p><strong>Email:</strong> {Email}</p> 
      <div>
        <button onClick={()=>handleSubmitDelete(ID)}>Eliminar</button>
      </div>
      {mostrar 
      
      ?  
      <div>
         <button onClick={(e)=> {handleSubmitEdit(e,ID);
                                      setMostrar(false);
                                      ;        } 
        }>Editar</button>
      </div> 
        
      :
       <div>
          <button onClick={(e)=>handlePrueba(e,ID)}>Guardar</button>
       </div> 
      
      }

    </div>
  );
}

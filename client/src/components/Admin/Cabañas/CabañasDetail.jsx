import React, {useState} from "react";
import styles from "./CabañasDetail.module.css";
import { useDispatch} from "react-redux";
import {removeCabains,restoreCabains}  from '../../../actions'

export default function CabinsDetail({ 
    ID,
    Number,
    Capacity,
    Available,
    Price,
    Description,
    Picture,
    Parrilla,
    Wifi,
    Parking,
    handleeditSubmit,
    handlePrueba,
    restaurar
}) {
  const dispatch = useDispatch();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID)=>{
    alert("su cabaña fue Eliminada con exito");
    let obj = { id: ID };
    dispatch(removeCabains(obj));
    window.location.reload(true);
  };

  const handleSubmitrestore = (ID)=>{
    console.log('funcion', ID)
    alert("su cabaña fue eliminada con exito");
    let obj = {id:ID}
    dispatch(restoreCabains(obj));
    window.location.reload(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.p}><strong>Cabaña N°:</strong> {Number}</p>
        <p className={styles.p}><strong>Camas:</strong>  {Capacity}</p>
        <div ><strong>Fechas No disponible:</strong>  {Available.map((e)=>{
          return(  
              <ul>
                <li>Del {e[0]} Al {e[e.length -1]}</li>
              </ul>)
              
          })}</div>
        <p className={styles.p}><strong>Price:</strong>  {Price}</p>
        <p className={styles.p}><strong>Descripcion:</strong>  {Description}</p>
        <p className={styles.p}><strong>Picture:</strong></p><img width="100px" src={Picture}/>
        <p className={styles.p}><strong>Parrilla:</strong>  {Parrilla?<span>si</span>:<span>no</span>}</p>
        <p className={styles.p}><strong> Wifi:</strong> {Wifi?<span>si</span>:<span>no</span>}</p>
        <p className={styles.p}><strong>Parking:</strong>  {Parking?<span>si</span>:<span>no</span>}</p>
      </div>
      <div className={styles.btnsContainer}>
        <div>
          {!restaurar?(
            <button onClick={()=>handleSubmitDelete(ID)} className={styles.btn}>Eliminar</button>

          ):(
            <button onClick={()=>handleSubmitrestore(ID)} className={styles.btn}>Restaurar</button>
          )}
        </div>
        {mostrar      
        ?  
        <div>
          <button onClick={(e)=> {handleeditSubmit(e,ID, Number,
    Capacity,
    Available,
    Price,
    Description,
    Picture,
    Parrilla,
    Wifi,
    Parking);
                                        setMostrar(false);
                                        ;        } 
          } className={styles.btnPlus} >Editar</button>
        </div> 
          
        :
        <div>
            <button onClick={(e)=>handlePrueba(e,ID,)} className={styles.btnPlus}>Guardar</button>
        </div> 
        
        }
      </div>
    </div>
  );
}

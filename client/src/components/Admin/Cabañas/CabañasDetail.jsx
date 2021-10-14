import React, { useState } from "react";
import styles from "./CabañasDetail.module.css";
import { useDispatch } from "react-redux";
import { removeCabains, restoreCabains } from '../../../actions';
import { GiBarbecue } from 'react-icons/gi';
import { FaWifi, FaCarAlt } from 'react-icons/fa';

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
  const handleSubmitDelete = (ID) => {
    dispatch(removeCabains({ id: ID }));
    alert("su cabaña fue Eliminada con exito");
    window.location.reload();

  };

  const handleSubmitrestore = (ID) => {
    console.log('funcion', ID)
    dispatch(restoreCabains({ id: ID }));
    alert("su cabaña fue restaurada con exito");
    window.location.reload();

  }

  return (
    <div className={styles.detailCard}>
      <div className={styles.infoContainer}>
        <table>
          <tbody>
            <tr>
              <td className={styles.izquierda}><strong>Cabaña N°:</strong></td>
              <td className={styles.derecha}>{Number}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Camas:</strong></td>
              <td className={styles.derecha}>{Capacity}</td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Fechas ocupadas:</strong></td>
              <td className={styles.derecha}><ul>{
                Available.length !== 0 && Available.map(e => <li>Del {e[0]} al {e[e.length - 1]}</li>)
              }</ul></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Precio:</strong></td>
              <td className={styles.derecha}>$ {Price}</td>
            </tr>
            <tr>
              <td className={styles.izquierda} id={styles.descripcion}><strong>Descripción:</strong></td>
              <td className={styles.derecha}><p>{Description}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Foto:</strong></td>
              <td className={styles.derecha}><img width="100px" src={Picture} /></td>
            </tr>
          </tbody>
        </table>
        <span> {Parrilla && <p><GiBarbecue /></p>}  {Wifi && <p><FaWifi /></p>}  {Parking && <p><FaCarAlt /></p>} </span>
        {/* <p className={styles.p}><strong>Cabaña N°:</strong> {Number}</p>
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
        <p className={styles.p}><strong>Parking:</strong>  {Parking?<span>si</span>:<span>no</span>}</p> */}
      </div>
      <div className={styles.btnsContainer}>
        <div>
          {!restaurar ? (
            <button onClick={() => handleSubmitDelete(ID)} className={styles.btn}>Ocultar</button>

          ) : (
            <button onClick={() => handleSubmitrestore(ID)} className={styles.btn}>Restaurar</button>
          )}
        </div>
        {mostrar
          ?
          <div>
            <button onClick={(e) => {
              handleeditSubmit(
                e,
                ID,
                Number,
                Capacity,
                Available,
                Price,
                Description,
                Picture,
                Parrilla,
                Wifi,
                Parking);
              setMostrar(false);
              ;
            }
            } className={styles.btnPlus} >Editar</button>
          </div>

          :
          <div>
            <button onClick={(e) => handlePrueba(e, ID,)} className={styles.btnPlus}>Guardar</button>
          </div>

        }
      </div>
    </div>
  );
}

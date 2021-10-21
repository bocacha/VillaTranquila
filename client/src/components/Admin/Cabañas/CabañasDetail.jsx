import React, { useState } from "react";
import styles from "./CabañasDetail.module.css";
import { useDispatch } from "react-redux";
import { removeCabains, restoreCabains } from '../../../actions';
import { GiBarbecue } from 'react-icons/gi';
import { FaWifi, FaCarAlt } from 'react-icons/fa';
import { useHistory } from "react-router";

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
  const history = useHistory();
  const [mostrar, setMostrar] = useState(true);
  const handleSubmitDelete = (ID) => {
    dispatch(removeCabains({ id: ID }));
    alert("su cabaña fue Eliminada con exito");
    //window.location.reload();
    setTimeout(function () {
      history.go(0);
    }, 500)

  };

  const handleSubmitrestore = (ID) => {
    dispatch(restoreCabains({ id: ID }));
    alert("su cabaña fue restaurada con exito");
    setTimeout(function () {
      history.go(0);
    }, 500)
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
                Available.length !== 0 ?
                  Available.map(e => <li>Del {e[0]} al {e[e.length - 1]}</li>) :
                  'Sin reservas aún'
              }</ul></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Precio:</strong></td>
              <td className={styles.derecha}>$ {Price}</td>
            </tr>
            <tr>
              <td className={styles.izquierda} ><strong>Descripción:</strong></td>
              <td className={styles.derecha}><p>{Description}</p></td>
            </tr>
            <tr>
              <td className={styles.izquierda}><strong>Foto:</strong></td>
              <td className={styles.derecha}><img width="100px" src={Picture} /></td>
            </tr>
          </tbody>
        </table>
        <span> {Parrilla && <p><GiBarbecue /></p>}  {Wifi && <p><FaWifi /></p>}  {Parking && <p><FaCarAlt /></p>} </span>
      </div>
      <div className={styles.btnsContainer}>
        <div>
          {!restaurar ? (
            <button onClick={() => {
              handleSubmitDelete(ID);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
              }}
              className={styles.btn}>Ocultar</button>

          ) : (
            <button onClick={() => {
              handleSubmitrestore(ID);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
              }}
              className={styles.btn}>Restaurar</button>
          )}
        </div>
          <div>
            <button
              onClick={(e) => {
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
    </div>
  );
}

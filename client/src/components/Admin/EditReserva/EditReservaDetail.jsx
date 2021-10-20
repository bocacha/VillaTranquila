import React, { useState } from "react";
import styles from "./EditReserva.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { cancelarCambios, RestaurarCambios} from "../../../actions";
// import fechas from "../../Reserva/Linkreserva/algoritmofechas"

export default function EditReserva({
    ID,
    Original,
    Nuevo,
    logeduser,
    handlePrueba,
    restaurar,
}) {
    //   const Available = fechas({Checkin:Checkin, Checkout:Checkout})
    const dispatch = useDispatch();
    const history = useHistory();
    const [mostrar, setMostrar] = useState(true);
    const {token}= logeduser

    const handleSubmitDelete = (ID) => {
        dispatch(cancelarCambios({...Original},{id:ID}))
        alert("su Reserva fue Eliminada con exito");
        // setTimeout(function () {
        //     history.go(0);
        // }, 500)

    };
    const handleSubmitrestore = (ID) => {
        dispatch(RestaurarCambios({...Original},{id:ID},{token}))
        alert("su cabaña fue Restaurada con exito");
        // setTimeout(function () {
        //     history.go(0);
        // }, 500)

    };
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.izquierda}>Nombre de usuario:</td>
                                <td className={styles.derecha}>{Original.UserName}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Reserva a nombre de:</td>
                                <td className={styles.derecha}>{Original.Anombrede}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Fecha de llegada:</td>
                                <td className={styles.derecha}>{Original.Checkin}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Fecha de salida:</td>
                                <td className={styles.derecha}>{Original.Checkout}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Cabaña número:</td>
                                <td className={styles.derecha}>{Original.CabinNumber}</td>
                            </tr>
                            {
                                Original.ExtraServices && Original.ExtraServices.length !== 0 &&
                                <tr>
                                    <td className={styles.izquierda}>Servicios extra:</td>
                                    <td className={styles.derecha}>
                                        <ul>
                                            {
                                                Original.ExtraServices.map(el => <li>{el}</li>)
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td className={styles.izquierda}>Precio final:</td>
                                <td className={styles.derecha}>$ {Original.CostoFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.infoContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.izquierda}>Nombre de usuario:</td>
                                <td className={styles.derecha}>{Nuevo.UserName}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Reserva a nombre de:</td>
                                <td className={styles.derecha}>{Nuevo.Anombrede}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Fecha de llegada:</td>
                                <td className={styles.derecha}>{Nuevo.Checkin}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Fecha de salida:</td>
                                <td className={styles.derecha}>{Nuevo.Checkout}</td>
                            </tr>
                            <tr>
                                <td className={styles.izquierda}>Cabaña número:</td>
                                <td className={styles.derecha}>{Nuevo.CabinNumber}</td>
                            </tr>
                            {
                                Nuevo.ExtraServices && Nuevo.ExtraServices !== null &&
                                <tr>
                                    <td className={styles.izquierda}>Servicios extra:</td>
                                    <td className={styles.derecha}>
                                        <ul>
                                            {
                                                Nuevo.ExtraServices.map(el => <li>{el}</li>)
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td className={styles.izquierda}>Precio final:</td>
                                <td className={styles.derecha}>$ {Nuevo.CostoFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div className={styles.btnsContainer}>
                {!restaurar ? (
                    <button
                        onClick={(e) => handleSubmitDelete(ID)}
                        className={styles.btn}
                    >
                        Negar
                    </button>
                ) : (
                    <button
                        onClick={(e) => handleSubmitrestore(ID,Original)}
                        className={styles.btn}
                    >
                        Restaurar
                    </button>
                )}
                <button
                    onClick={(e) => {
                        handlePrueba(e,ID,Nuevo);
                        setMostrar(false);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        });
                    }}
                    className={styles.btnPlus}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}
import { Link } from "react-router-dom";
import styles from './CajaDetail.module.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Logeduser,readReservation} from '../../../actions';



export default function CajaDetail (props) { 
const {id_reserva,status,status_detail,pagoNeto,pagoTotal,UserName,
    FirstName,LastName,Email,fecha,reservationhistory,Address,NoMostrar}=props
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser());
    }, [dispatch]);
    const logeduser = useSelector((state) => state.user);
    const { token } = logeduser;    
    
    useEffect(() => {
        dispatch(readReservation({ token }));
    }, [dispatch, token]);
    
    const allReservations = useSelector((state) => state.reservaciones);
    const reserva= allReservations.filter(e=>""+ e.ID === ""+id_reserva)
    return (
        <div className={styles.fondo}>
            <div className={styles.container}>
                <div className={styles.encabezado}>
                    <h3>Detalle del pago</h3>
                    <h4>Fecha: {""+fecha}</h4>
                    <hr/>
                </div>
                
                <div className={styles.usuario}>
                    <p>Nick:{""+UserName}</p>
                    <p>Nombre:{""+FirstName}</p>
                    <p>Apellido:{""+LastName}</p>
                    <hr/>
                </div>
                <div className={styles.usuarioDetalle}>
                    <p>e-mail:{""+Email}</p>
                    <p>Dirección:{""+Address}</p>
                    <hr/>
                </div>
                <div className={styles.transaccion}>
                    <p>Datos de la Reserva :</p>
                    {/* <p>Cabaña nº: {reserva[0].Cabinid}</p>
                    <p>Fecha: Del{reserva[0].Checkin} al {reserva[0].Checkout}</p>
                    <p>A Nombre De: {reserva[0].Anombrede}</p> */}
                    <p>Estado del pago: {""+status}</p>
                    <p>Total abonado: ${""+pagoTotal}.00</p>
                    <p>Ganancia NETA: ${""+pagoNeto}</p>
                    <hr/>
                </div>
                <div className={styles.history}>
                    <p>Historial de reservas del usuario:</p>
                    {/* <p>{reservationhistory}</p> */}
                </div>
                    <button className={styles.volver}onClick={NoMostrar}>Ocultar</button>
            </div>
        </div>

    )
}
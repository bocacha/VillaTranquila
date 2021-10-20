import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editReservation,
  readReservation,
  Logeduser,
  readReservationocultados,
  readUsers,
  getCabins,
  getCambios,
  getCambiosDone,
  RestaurarCambios,
  cancelarCambios,
  aceptarCambios
} from "../../../actions";
import EditReservaDetail from "./EditReservaDetail";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";
registerLocale('es', es)

export default function Reservaciones() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCabins())
  }, [dispatch])
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [habilitar, setHabilitar] = useState(false);

  useEffect(() => {
    dispatch(readUsers({ token }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCambios());
  }, [dispatch]);

  const allReservations = useSelector((state) => state.solicitudes);

  
  function handlePrueba(e, ID, Nuevo) {
      console.log(Nuevo)
      dispatch(aceptarCambios({...Nuevo},{ token },{id:ID}))
    e.preventDefault();
    alert("Editado")

  }
 
  const ocultadas = () => {
    dispatch(getCambiosDone())
    setHabilitar(true)

  }
  const showtrue = () => {
    dispatch(getCambios())
    setHabilitar(false)

  }
  return (
    <div className={styles.reservasAdmin}>
      <Navbar />
      <NavAdmin />
      <div className={styles.container1}>
        <div className={styles.btnsContainer}>
          {!habilitar ? (
            <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
          ) : (
            <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
          )
          }
        </div>
        <div className={styles.container2}>
          </div>
        <div className={styles.containerReservas}>
          {allReservations.length !== 0 ?
            allReservations.map((el) => {         
                  return (
                    <div className={styles.detalles} key={el.ID}>
                      <EditReservaDetail
                        ID={el.ID}
                        Original={el.Original}
                        Nuevo={el.Nuevo}
                        handlePrueba={handlePrueba}
                        logeduser={logeduser}
                        restaurar={habilitar}
                      />
                    </div>
                  );

             
            }) :
            <div className={styles.ninguna}>No se encontró ninguna Peticion de Cambio</div>}
        </div>
      </div>
    </div>
  );
}
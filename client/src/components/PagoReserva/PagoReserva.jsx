import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readReservation } from "../../actions";
import Navbar from "../Navbar/Navbar";
import styles from "./PagoReserva.module.css";
import fechas from "../Reserva/Linkreserva/algoritmofechas"

export default function PagosReserva(ID) {
  const dispatch = useDispatch();
  const reservaciones = useSelector((state) => state.reservaciones);
  console.log(reservaciones);
  useEffect(() => {
    dispatch(readReservation());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <div>¡Tus vacaciones ya están cerca!</div>
      {reservaciones?.map((reservacion) => {
        const reser = { Checkin: reservacion.Checkin, Checkout: reservacion.Checkout}
        const diasdereserva=fechas(reser)
        const costoFINAL = reservacion.CostoFinal * (diasdereserva.length -1)
        return (
          <div>
            <ul>
              <li>Reservacion a nombre de: {reservacion.Anombrede}</li>
              <li>Checkin:{reservacion.Checkin}</li>
              <li>Checkout:{reservacion.Checkout}</li>
              <li>Servicios extra:{reservacion.ExtraServices}</li>
              <li>Costo final:{costoFINAL}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

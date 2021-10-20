import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readReservation, Logeduser, selectcabin, readCabains} from "../../actions";
import Navbar from "../Navbar/Navbar";
import styles from "./PagoReserva.module.css";
import fechas from "../Reserva/Linkreserva/algoritmofechas"

export default function PagosReserva(ID) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
}, [dispatch]);
useEffect(() => {
  dispatch(readReservation());
}, [dispatch]);
useEffect(() => {
  dispatch(readCabains());
}, [dispatch]);

  const user = useSelector((state) => state.user);
  const reservaciones = useSelector((state) => state.reservaciones);
  const cabañas = useSelector((state)=> state.cabañas);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.title}>¡Tus vacaciones ya están cerca!</div>
      {reservaciones?.map((reservacion) => {
        if(cabañas){
          const seleccionada = cabañas.filter(e=> e.ID === reservacion.Cabinid)
        if(reservacion.UserId === user.userid){
          const reser = { Checkin: reservacion.Checkin, Checkout: reservacion.Checkout}
        const diasdereserva=fechas(reser)
        const costoFINAL = reservacion.CostoFinal * (diasdereserva.length -1)
        return (
          <div className={styles.containerInfo}>
            <ul>
              <li className={styles.li}>Cabaña Nª {seleccionada[0].Number}</li>
              <li className={styles.li}>Reservacion a nombre de: {reservacion.Anombrede}</li>
              <li className={styles.li}>Checkin:{reservacion.Checkin}</li>
              <li className={styles.li}>Checkout:{reservacion.Checkout}</li>
              <li className={styles.li}>Servicios extra:{reservacion.ExtraServices}</li>
              <li className={styles.li}>Costo final:{costoFINAL}</li>
            </ul>
            <hr />
            {/* <form action="http://localhost:3001/checkout" method="POST"> */}
            <form action="https://villatranquila.herokuapp.com/checkout" method="POST">
              <input type="hidden" name="title" value={seleccionada[0].Number}/>
              <input type="hidden" name="price" value={costoFINAL}/>
              <input type="hidden" name="idreserva" value={reservacion.ID}/>                         
              <input type="submit" value="Pagar" target="_blank" class="btn btn-primary btn-block"/>
            </form> 
          </div>
        );
        }
        return null
      }else{return null}
    })}
      
    </div>
  );
}
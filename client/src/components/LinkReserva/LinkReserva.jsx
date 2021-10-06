import React, { useState, useEffect } from "react";
import styles from "./LinkReserva.module.css";
import { useDispatch, useSelector} from "react-redux";
import {
  createReservation,
  editReservation,
  readReservation,
  Logeduser
} from "../../actions";
// import ReservacionesDetail from "./ReservacionesDetail";
// import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from "react-router-dom";

export default function Reservaciones(id) {

  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);
  const cabaña = id;
  const dispatch = useDispatch();
  const allReservations = useSelector((state) => state.reservaciones);
  const costo = localStorage.getItem("costo")
  console.log("COSTO", JSON.parse(costo));
  const cabinId = localStorage.getItem("id_cabaña")
  console.log("CABAÑA_ID", JSON.parse(cabinId));
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  
  const [input, setInput] = useState({
    Checkin: "",
    Checkout: "",
    UserId: logeduser.userid,
    CostoFinal: JSON.parse(costo),
    Cabinid: JSON.parse(cabinId),
    ExtraServices: "",
  });
  
  useEffect(() => {
    dispatch(readReservation({ token }));
  }, [dispatch, token]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(createReservation(input));
    // alert("Reserva creada con éxito");
    // window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/reserva">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <div className={styles.formsCont}>
        {/* CREAR */}
        <div className={styles.crearCont}>
          <div className={styles.title}>Crear una nueva reservación</div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
              type="text"
              value={input.Checkin}
              name="Checkin"
              onChange={(e) => handleChange(e)}
              placeholder="Check in"
              className={styles.formInputs}
              required
            />
                   {/* <DatePicker
          selected={selectDateCI}
          onChange={date=> setSelectDateCI(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          //isClearable
          /> */}
            <input
              type="text"
              value={input.Checkout}
              name="Checkout"
              onChange={(e) => handleChange(e)}
              placeholder="Check out"
              className={styles.formInputs}
              required
            />
              {/* 
          <DatePicker
          selected={selectDateCO}
          onChange={date=> setSelectDateCO(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          //isClearable
          /> */}  
            {/* <input
              type="text"
              value={input.UserId}
              name="UserId"
              onChange={(e) => handleChange(e)}
              placeholder="Usuario Id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            /> */}
            {/* <input
              type="text"
              value={input.Paymentsid}
              name="Paymentsid"
              onChange={(e) => handleChange(e)}
              placeholder="Pagos id"
              className={styles.formInputs} 
              // pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$' 
              required
            /> */}
            {/* <input
              type="text"
              value={input.Cabinid}
              name="Cabinid"
              onChange={(e) => handleChange(e)}
              placeholder="Cabaña id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            /> */}
            {/* <input
              type="text"
              value={input.ExtraServices}
              name="ExtraServices"
              onChange={(e) => handleChange(e)}
              placeholder="Servicios extra"
              className={styles.formInputs}
            /> */}
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;

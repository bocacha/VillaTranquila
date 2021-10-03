import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector} from "react-redux";
import {
  createReservation,
  editReservation,
  readReservation,
  Logeduser
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

export default function Reservaciones() {

  const [selectDateCI, setSelectDateCI] = useState(null);
  const [selectDateCO, setSelectDateCO] = useState(null);

  const dispatch = useDispatch();
  const allReservations = useSelector((state) => state.reservaciones);
  const logeduser = useSelector((state) => state.user);
  const { token } = logeduser;
  const [input, setInput] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });
  const [edit, setEdit] = useState({
    id: "",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(readReservation({ token }));
  }, [dispatch, token]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createReservation(input));
    alert("Reserva creada con éxito");
    setInput({
      id: "",
      Checkin: "",
      Checkout: "",
      UserId: "",
      Paymentsid: "",
      Cabinid: "",
      ExtraServices: "",
    });
  }
  function handleSubmitEdit(e) {
    e.preventDefault();
    dispatch(editReservation(edit));
    alert("Reserva editada con éxito");
    setInput({
      id: "",
      Checkin: "",
      Checkout: "",
      UserId: "",
      Paymentsid: "",
      Cabinid: "",
      ExtraServices: "",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link to="/admin">
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
            <input
              type="text"
              value={input.UserId}
              name="UserId"
              onChange={(e) => handleChange(e)}
              placeholder="Usuario Id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            />
            <input
              type="text"
              value={input.Paymentsid}
              name="Paymentsid"
              onChange={(e) => handleChange(e)}
              placeholder="Pagos id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            />
            <input
              type="text"
              value={input.Cabinid}
              name="Cabinid"
              onChange={(e) => handleChange(e)}
              placeholder="Cabaña id"
              className={styles.formInputs} 
              pattern='^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$'
              required
            />
            <input
              type="text"
              value={input.ExtraServices}
              name="ExtraServices"
              onChange={(e) => handleChange(e)}
              placeholder="Servicios extra"
              className={styles.formInputs}
            />
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Crear
              </button>
            </div>
          </form>
        </div>
        {/* EDITAR */}
        <div className={styles.editarCont}>
          <div className={styles.title}> Editar reserva</div>
          <form onSubmit={(e) => handleSubmitEdit(e)}>
            <input
              type="text"
              value={edit.id}
              name="id"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Checkin}
              name="Checkin"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Check in"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Checkout}
              name="Checkout"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Check out"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.UserId}
              name="UserId"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Usuario id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Paymentsid}
              name="Paymentsid"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Pagos id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.Cabinid}
              name="Cabinid"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Cabaña id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={edit.ExtraServices}
              name="ExtraServices"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Servicios extra"
              className={styles.formInputs}
            />
            <div className={styles.btns}>
              <button type="submit" className={styles.btn}>
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* VER */}
      <div>
        {allReservations?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <ReservacionesDetail
                ID={el.ID}
                Checkin={el.Checkin}
                Checkout={el.Checkout}
                UserId={el.UserId}
                Paymentsid={el.Paymentsid}
                Cabinid={el.Cabinid}
                ExtraServices={el.ExtraServices}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;

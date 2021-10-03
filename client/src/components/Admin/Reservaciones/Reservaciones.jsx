import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  editReservation,
  readReservation,
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";
import { Link } from "react-router-dom";

export default function Reservaciones() {
  const dispatch = useDispatch();
  const allReservations = useSelector((state) => state.reservaciones);
  const logeduser = useSelector ((state) => state.user);
  const {token}  = logeduser
  const [input, setInput] = useState({
    id:"",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });
  const [edit, setEdit] = useState({
    id:"",
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });

  useEffect(() => {
    dispatch(readReservation({token}));
  }, [dispatch,token]);

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
      id:"",
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
      id:"",
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
          <button>Volver</button>
        </Link>
      </div>
      {/* CREAR */}
      <div>
        Crear una nueva reservación
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.Checkin}
            name="Checkin"
            onChange={(e) => handleChange(e)}
            placeholder="Checkin"
            className={styles.Checkin}
          />
          <input
            type="text"
            value={input.Checkout}
            name="Checkout"
            onChange={(e) => handleChange(e)}
            placeholder="Checkout"
            className={styles.Checkout}
          />
          <input
            type="text"
            value={input.UserId}
            name="UserId"
            onChange={(e) => handleChange(e)}
            placeholder="UserId"
            className={styles.UserId}
          />
          <input
            type="text"
            value={input.Paymentsid}
            name="Paymentsid"
            onChange={(e) => handleChange(e)}
            placeholder="Paymentsid"
            className={styles.paymentsid}
          />
          <input
            type="text"
            value={input.Cabinid}
            name="Cabinid"
            onChange={(e) => handleChange(e)}
            placeholder="Cabinid"
            className={styles.cabinid}
          />
          <input
            type="text"
            value={input.ExtraServices}
            name="ExtraServices"
            onChange={(e) => handleChange(e)}
            placeholder="ExtraServices"
            className={styles.extraServices}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
      </div>
      {/* EDITAR */}
      <div>
        Editar reserva
        <form onSubmit={(e) => handleSubmitEdit(e)}>
          <input
            type="text"
            value={edit.id}
            name="id"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="ID"
            className={styles.id}
          />
          <input
            type="text"
            value={edit.Checkin}
            name="Checkin"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Checkin"
            className={styles.Checkin}
          />
          <input
            type="text"
            value={edit.Checkout}
            name="Checkout"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Checkout"
            className={styles.Checkout}
          />
          <input
            type="text"
            value={edit.UserId}
            name="UserId"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="UserId"
            className={styles.UserId}
          />
          <input
            type="text"
            value={edit.Paymentsid}
            name="Paymentsid"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Paymentsid"
            className={styles.paymentsid}
          />
          <input
            type="text"
            value={edit.Cabinid}
            name="Cabinid"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="Cabinid"
            className={styles.cabinid}
          />
          <input
            type="text"
            value={edit.ExtraServices}
            name="ExtraServices"
            onChange={(e) => handleChangeEdit(e)}
            placeholder="ExtraServices"
            className={styles.extraServices}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Editar
            </button>
          </div>
        </form>
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

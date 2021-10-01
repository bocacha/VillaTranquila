import React, { useState, useEffect } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  editReservation,
  readReservation,
} from "../../../actions";
import ReservacionesDetail from "./ReservacionesDetail";

export default function Reservaciones() {
  const dispatch = useDispatch();
  const allReservations = useSelector((state) => state.reservaciones);
  const [input, setInput] = useState({
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });

  useEffect(() => {
    dispatch(readReservation());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createReservation(input));
    alert("Reserva creada con éxito");
    setInput({
      Checkin: "",
      Checkout: "",
      UserId: "",
      Paymentsid: "",
      Cabinid: "",
      ExtraServices: "",
    });
    window.location.reload();
  }

  return (
    <div className={styles.container}>
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
      {/* EDITAR
      <div>
        Editar reserva
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
              Editar
            </button>
          </div>
        </form>
      </div> */}
      {/* VER */}
      <div>
        {allReservations?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <ReservacionesDetail
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

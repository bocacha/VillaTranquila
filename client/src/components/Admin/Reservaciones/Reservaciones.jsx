import React, { useState } from "react";
import styles from "./Reservaciones.module.css";
import { useDispatch } from "react-redux";
import { createReservation, editReservation } from "../../../actions";

export default function Reservaciones() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    Checkin: "",
    Checkout: "",
    UserId: "",
    Paymentsid: "",
    Cabinid: "",
    ExtraServices: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createReservation, editReservation(input));
    alert("Reserva creada con éxito");
    setInput({
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
      </div>
    </div>
  );
}



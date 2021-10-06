import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendEmail } from "../../actions";
import style from "../Contacto/Contacto.module.css";
import Navbar from "../Navbar/Navbar";

export default function Contacto() {
  const [control, setControl] = useState({
    name: "",
    tel: "",
    email: "",
    query: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const { name, tel, email, query } = control;

  const changeControl = (e) => {
    setControl({
      ...control,
      [e.target.name]: e.target.value,
    });
  };

  const submitQuery = (e) => {
    e.preventDefault();

    if (name === "" || tel === "" || email === "" || query === "") {
      setError(true);
      return;
    }

    setError(false);

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorEmail(true);
      return;
    }

    setErrorEmail(false);
    dispatch(sendEmail(control));
    alert("Tu consulta fue enviada, muchas gracias");
    history.push("/");
  };

  return (
    <div className={style.containerForm}>
      <Navbar />
      <form onSubmit={submitQuery} className={style.form}>
        {error ? (
          <div className={style.Error}>
            <h4>Todos los campos son obligatorios</h4>
          </div>
        ) : null}
        <div className={style.inputCont}>
        <h2>Contacto</h2>
          <input
            type="text"
            name="name"
            value={control.name}
            pattern="[a-zA-Z ]{2,254}"
            title="Sólo letras"
            onChange={changeControl}
            placeholder="Nombre"
            className={style.formInputs}
            required
          />
        </div>
        <div className={style.inputCont}>
          <input
            type="tel"
            name="tel"
            value={control.tel}
            maxLength="17"
            minLength="10"
            pattern="[+]{2}[0-9]{10-14}"
            onChange={changeControl}
            placeholder="Teléfono"
            required
            className={style.formInputsTel}
          />
          <div className={style.smallCont}>
            <small className={style.small}>Ej: +54 9 11 12345678 </small>
          </div>
          {errorEmail ? (
            <div className={style.Error}>
              <h4>correo electronico incorrecto</h4>
            </div>
          ) : null}
        </div>
        <div className={style.inputCont}>
          <input
            type="email"
            name="email"
            value={control.email}
            onChange={changeControl}
            placeholder="Email"
            required
            className={style.formInputs}
          />
        </div>

        <div className={style.inputCont}>
          <textarea
            name="query"
            value={control.query}
            rows="5"
            cols="23"
            onChange={changeControl}
            placeholder="Consulta"
            required
            className={style.txtArea}
          />
        </div>
        <div className={style.inputCont}>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

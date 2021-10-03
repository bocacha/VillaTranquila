import React, { useState, useEffect } from "react";
import styles from "./Registro.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers} from "../../actions/index";
import { Link } from "react-router-dom";
import { Logeduser } from "../../actions";
import Navbar from "../Navbar/Navbar";

export default function Usuarios() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser())
}, [dispatch]);
  const allUsers = useSelector((state) => state.usuarios);
  const [input, setInput] = useState({
    UserName: "",
    UserPassword: "",
    FirstName: "",
    LastName: "",
    Address: "",
    Phone: "",
    Email: "",
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUsers(input));
    setInput({
      UserName: "",
      UserPassword: "",
      FirstName: "",
      LastName: "",
      Address: "",
      Phone: "",
      Email: "",
    });
    // window.location.href='/login'
  }

  return (
    <div className={styles.container}>
      <Navbar />
      {/* CREAR */}
      <div className={styles.containerForm}>
        <div className={styles.title}>Registrate</div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <input
            type="text"
            value={input.UserName}
            name="UserName"
            onChange={(e) => handleChange(e)}
            placeholder="UserName"
            className={styles.formInputs}
          />
          <input
            type="password"
            value={input.UserPassword}
            name="UserPassword"
            onChange={(e) => handleChange(e)}
            placeholder="UserPassword"
            className={styles.formInputs}
          />
          <input
            type="text"
            value={input.FirstName}
            name="FirstName"
            onChange={(e) => handleChange(e)}
            placeholder="FirstName"
            className={styles.formInputs}
          />
          <input
            type="text"
            value={input.LastName}
            name="LastName"
            onChange={(e) => handleChange(e)}
            placeholder="LastName"
            className={styles.formInputs}
          />
          <input
            type="text"
            value={input.Address}
            name="Address"
            onChange={(e) => handleChange(e)}
            placeholder="Address"
            className={styles.formInputs}
          />
          <input
            type="text"
            value={input.Phone}
            name="Phone"
            onChange={(e) => handleChange(e)}
            placeholder="Phone"
            className={styles.formInputs}
          />
          <input
            type="text"
            value={input.Email}
            name="Email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className={styles.formInputs}
          />
          <div className={styles.btns}>
            <button type="submit" className={styles.btn}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

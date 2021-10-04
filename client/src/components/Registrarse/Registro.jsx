import React, { useState, useEffect } from "react";
import styles from "./Registro.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../../actions/index";
import { Link } from "react-router-dom";
import { Logeduser } from "../../actions";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function Usuarios() {
  const [creado, setCreado] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
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
  let uusername = input.UserName;
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUsers(input));
    // window.location.href='/login'
  }
  const registroexitoso = async () => {
    const newuser = await axios.get("http://localhost:3001/users/");
    const existe = newuser.data.filter((e) => e.UserName === uusername);
    console.log(existe);
    if (existe) {
      if (existe.length > 0) {
        console.log(existe.length);
        setCreado(true);
        console.log(creado);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {/* CREAR */}{" "}
      {!creado ? (
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
              <button
                type="submit"
                onClick={() => {
                  setTimeout(function() {
                    registroexitoso();
                  }, 3000);
                }}
                className={styles.btn}
              >
                Crear
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.container}> 
        <div className={styles.containerForm}>
      <h4> Cuenta creada </h4>
         <button className={styles.btn1}onClick={()=>{window.location.href="/iniciarsesion"}} ><strong>Iniciar Sesion</strong></button>                 
      </div>
        </div>
      )}
    </div>
  );
}

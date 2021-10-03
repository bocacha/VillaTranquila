import React, { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, readUsers } from "../../../actions";
import UsuariosDetail from "./UsuariosDetail";

export default function Usuarios() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(readUsers());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUsers(input));
    alert("Usuario creado con éxito");
    setInput({
      UserName: "",
      UserPassword: "",
      FirstName: "",
      LastName: "",
      Address: "",
      Phone: "",
      Email: "",
    });
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      {/* CREAR */}
      <div>
        Crear un nuevo usuario
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.UserName}
            name="UserName"
            onChange={(e) => handleChange(e)}
            placeholder="Nombre de usuario"
            pattern='^[0-9a-zA-Z]+$'
            className={styles.UserName}
            required
          />

          <input
            type="text"
            value={input.UserPassword}
            name="UserPassword"
            onChange={(e) => handleChange(e)}
            placeholder="Contraseña"
            className={styles.UserPassword}
            pattern= '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$'
            required
          />
            {/* Minimo 8 caracteres
            Maximo 15
            Al menos una letra mayúscula
            Al menos una letra minucula
            Al menos un dígito
            No espacios en blanco
            Al menos 1 caracter especial */}

          <input
            type="text"
            value={input.FirstName}
            name="FirstName"
            onChange={(e) => handleChange(e)}
            placeholder="Nombre"
            className={styles.FirstName}
            pattern='[a-zA-Z ]{2,254}'
            required
          />

          <input
            type="text"
            value={input.LastName}
            name="LastName"
            onChange={(e) => handleChange(e)}
            placeholder="Apellido"
            className={styles.LastName}
            pattern='[a-zA-Z ]{2,254}'
            required
          />

          <input
            type="text"
            value={input.Address}
            name="Address"
            onChange={(e) => handleChange(e)}
            placeholder="Direccion"
            pattern='^[0-9a-zA-Z]+$'
            className={styles.Address}
            required
          />

          <input
            type="text"
            value={input.Phone}
            name="Phone"
            onChange={(e) => handleChange(e)}
            placeholder="Teléfono"
            className={styles.Phone}
            maxLength="17" 
            minLength="10" 
            pattern="[+]{2}[0-9]{10-14}" 
            placeholder="+54 9 11 12345678" 
            required
          />

          <small>Ej: +54 9 11 12345678 </small>

          <input
            type="email"
            value={input.Email}
            name="Email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
            className={styles.Email}
            required
          />

          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
      </div>

      <div>
        {allUsers?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <UsuariosDetail
                UserName={el.UserName}
                UserPassword={el.UserPassword}
                FirstName={el.FirstName}
                LastName={el.LastName}
                Address={el.Address}
                Phone={el.Phone}
                Email={el.Email}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

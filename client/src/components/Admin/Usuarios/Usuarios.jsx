import React, { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, readUsers, editUsers } from "../../../actions";
import UsuariosDetail from "./UsuariosDetail";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.usuarios);
  const logeduser = useSelector((state) => state.user);
  const [input, setInput] = useState({
    id: "",
    UserName: "",
    UserPassword: "",
    FirstName: "",
    LastName: "",
    Address: "",
    Phone: "",
    Email: "",
    Admin: "",
    Premium: "",
    Blocked: "",
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

  function handleSelectAdmin(e) {
    setInput({
      ...input,
      Admin: e.target.value,
    });
  }
  function handleSelectPremium(e) {
    setInput({
      ...input,
      Premium: e.target.value,
    });
  }
  function handleSelectBlocked(e) {
    setInput({
      ...input,
      Blocked: e.target.value,
    });
  }

  function handleSubmit(e) {
    const { token } = logeduser;
    e.preventDefault();
    dispatch(editUsers(input));
    alert("Usuario editado con éxito");
    setInput({
      id: "",
      UserName: "",
      UserPassword: "",
      FirstName: "",
      LastName: "",
      Address: "",
      Phone: "",
      Email: "",
      Admin: "",
      Premium: "",
      Blocked: "",
    });
    dispatch(readUsers({ token }));
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
          <div className={styles.title}> Editar un nuevo usuario</div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
              type="text"
              value={input.id}
              name="id"
              onChange={(e) => handleChange(e)}
              placeholder="Id"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.UserName}
              name="UserName"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre de usuario"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.UserPassword}
              name="UserPassword"
              onChange={(e) => handleChange(e)}
              placeholder="Contraseña del usuario"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.FirstName}
              name="FirstName"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.LastName}
              name="LastName"
              onChange={(e) => handleChange(e)}
              placeholder="Apellido"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.Address}
              name="Address"
              onChange={(e) => handleChange(e)}
              placeholder="Dirección"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.Phone}
              name="Phone"
              onChange={(e) => handleChange(e)}
              placeholder="Télefono"
              className={styles.formInputs}
            />
            <input
              type="text"
              value={input.Email}
              name="Email"
              onChange={(e) => handleChange(e)}
              placeholder="E-mail"
              className={styles.formInputs}
            />
            <select
              onChange={(e) => handleSelectAdmin(e)}
              value={input.Admin}
              className={styles.formInputs}
              required
            >
              <option value="">Admin:</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <select
              onChange={(e) => handleSelectPremium(e)}
              value={input.Premium}
              className={styles.formInputs}
              required
            >
              <option value="">Premium:</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <select
              onChange={(e) => handleSelectBlocked(e)}
              value={input.Blocked}
              className={styles.formInputs}
              required
            >
              <option value="">Blocked:</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
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
        {allUsers?.map((el) => {
          return (
            <div className={styles.detalles} key={el.ID}>
              <UsuariosDetail
                ID={el.ID}
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

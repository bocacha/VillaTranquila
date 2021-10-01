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
            placeholder="UserName"
            className={styles.UserName}
          />
          <input
            type="text"
            value={input.UserPassword}
            name="UserPassword"
            onChange={(e) => handleChange(e)}
            placeholder="UserPassword"
            className={styles.UserPassword}
          />
          <input
            type="text"
            value={input.FirstName}
            name="FirstName"
            onChange={(e) => handleChange(e)}
            placeholder="FirstName"
            className={styles.FirstName}
          />
          <input
            type="text"
            value={input.LastName}
            name="LastName"
            onChange={(e) => handleChange(e)}
            placeholder="LastName"
            className={styles.LastName}
          />
          <input
            type="text"
            value={input.Address}
            name="Address"
            onChange={(e) => handleChange(e)}
            placeholder="Address"
            className={styles.Address}
          />
          <input
            type="text"
            value={input.Phone}
            name="Phone"
            onChange={(e) => handleChange(e)}
            placeholder="Phone"
            className={styles.Phone}
          />
          <input
            type="text"
            value={input.Email}
            name="Email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className={styles.Email}
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

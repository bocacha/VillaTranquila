import React, { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, readUsers, editUsers } from "../../../actions";
import UsuariosDetail from "./UsuariosDetail";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.usuarios);
  const logeduser = useSelector ((state) => state.user)
  const [input, setInput] = useState({
    id:"",
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
    const {token} = logeduser
    e.preventDefault();
    dispatch(editUsers(input));
    alert("Usuario editado con éxito");
    setInput({
      id:"",
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
    dispatch(readUsers({token}))
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
        Editar un nuevo usuario
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.id}
            name="id"
            onChange={(e) => handleChange(e)}
            placeholder="id"
            className={styles.id}
          />
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
          <select
            onChange={(e) => handleSelectAdmin(e)}
            value={input.Admin}
            className={styles.select}
            required
          >
            <option value="">Admin:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <select
            onChange={(e) => handleSelectPremium(e)}
            value={input.Premium}
            className={styles.select}
            required
          >
            <option value="">Premium:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <select
            onChange={(e) => handleSelectBlocked(e)}
            value={input.Blocked}
            className={styles.select}
            required
          >
            <option value="">Blocked:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Editar
            </button>
          </div>
        </form>
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

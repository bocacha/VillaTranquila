import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { Loguser, Logeduser } from "../../actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const [user, setuser] = useState({ UserName: "", UserPassword: "" });
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const Handlechange = (e) => {
    e.preventDefault();
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Loguser(user));
    // window.location.href='/'
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.containerForm}>
        <form>
          <input
            type="text"
            placeholder="Nombre de usuario"
            name="UserName"
            value={user.UserName}
            onChange={Handlechange}
            className={styles.formInputs}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="UserPassword"
            value={user.UserPassword}
            onChange={Handlechange}
            className={styles.formInputs}
          />
          <button onClick={handleLogin} className={styles.btn}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loguser, Logeduser, mailpassword } from "../../actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { ImCalendar } from 'react-icons/im';

export default function Login() {
  const dispatch = useDispatch();
  const [user, setuser] = useState({ UserName: "", UserPassword: "" });
  const [email, setEmail] = useState({ Email: "" })
  const [on, setON] = useState(false)
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
  const HandlechangeE = (e) => {
    e.preventDefault();
    setEmail({
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Loguser(user));
    // window.location.href='/'
  };
  const goHome = () => {
    window.location.href = '/reserva'
  }
  const send = () => {
    dispatch(mailpassword(email.Email), dispatch)
  }
  let logeduser = useSelector((state) => state.user);
  if (logeduser === null) {
    logeduser = {}
    logeduser.admin = false
    logeduser.token = false
  }
  return (
    <div className={styles.login}>
      <Navbar />
      <div className={styles.container}>
        {!logeduser.token ? (
          <div className={styles.containerForm}>
            <div className={styles.title}><strong>Inicie sesión con su nombre de usuario y contraseña</strong></div>
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
            <div>
              <button
                className={styles.btn}
                onClick={() => setON(true)}
              >
                <u>Olvidé mi usuario o contraseña</u>
              </button>
              <div>
                {on ? (
                  <div>
                    Email:
                    <input
                      type="text"
                      placeholder="ejemplo@ejemplo.com"
                      name="Email"
                      value={email.Email}
                      onChange={HandlechangeE}
                      className={styles.formInputs} />
                    <button className={styles.btn} onClick={send}>enviar</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
            <div className={styles.containerForm}>
              <h4 className={styles.title}> Bienvenido/a  {logeduser.user}, vamos a   </h4>
              <button
                className={styles.btn1}
                onClick={goHome}
              >
                <strong>Comenzar reserva <ImCalendar className={styles.icon}/></strong>
              </button>
            </div>


        )
        }
      </div>

    </div>
  );
}

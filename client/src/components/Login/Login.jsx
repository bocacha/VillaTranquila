import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loguser, Logeduser, mailpassword } from "../../actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { ImCalendar } from 'react-icons/im';
import { GoSignIn } from 'react-icons/go';
import { FaUnlockAlt } from 'react-icons/fa';

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
    logeduser.Blocked = false
  }
  const Blockeado=() =>{
    alert("Tu usuario se encuentra blockeado si crees que se trata de un error visita nuestra seccion de contacto y envianos un email")
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
              <button onClick={handleLogin} className={styles.btn}>
                Iniciar sesión <GoSignIn className={styles.icon}/>
              </button>
            </form>
            <div>
              <button
                className={styles.btn}
                onClick={() => setON(true)}
                id={styles.olvide}
              >
                <u>Olvidé mi contraseña</u>
              </button>
              <div>
                {on ? (
                  <div className={styles.recuperar}>
                    Enviaremos tu nueva contraseña a: 
                    <input
                      type="text"
                      placeholder="ejemplo@ejemplo.com"
                      name="Email"
                      value={email.Email}
                      onChange={HandlechangeE}
                      id={styles.mail} />
                    <button id={styles.recuperar} onClick={send}>Recuperar contraseña <FaUnlockAlt className={styles.icon}/></button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.containerForm}>
          {!logeduser.Blocked ? (
            <div>
              <h4 className={styles.title}> Bienvenido/a  {logeduser.user}, vamos a   </h4>
              <button
                className={styles.btn1}
                onClick={goHome}
              >
                <strong>Comenzar reserva <ImCalendar className={styles.icon} id={styles.reserva}/></strong>
              </button>
            </div>

          ):(
            <div>
            <h4 className={styles.title}> Bienvenido/a  {logeduser.user}</h4>
            <Link to="/contacto">
            <button
              className={styles.btn1}
              onClick={Blockeado}
            >
              <strong>Usuario Blockeado</strong>
            </button>
            </Link>
          </div>
          )
          }
          </div>

        )
        }
      </div>

    </div>
  );
}

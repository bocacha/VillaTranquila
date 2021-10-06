import React from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from "react-icons/ri";
import { GoSignIn, GoHome } from "react-icons/go";
import { ImCalendar } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import styles from "./Navbar.module.css";
import axios from "axios";
import { BiWindows } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Navbar() {
  let logeduser = useSelector((state) => state.user);
  if (logeduser === null) {
    logeduser = {};
    logeduser.admin = false;
    logeduser.token = false;
  }
  const Logout = () => {
    localStorage.removeItem("LogedUser");
    alert("Good by");
    window.location.href = "/";
  };

  return (
    <div>
      <ul className={styles.navbar}>
        <div className={styles.navbar2}>
          <li>
            <Link to="/">
              <button>
                <strong className={styles.list}>
                  Inicio <GoHome className={styles.icons} />
                </strong>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/reserva">
              <button>
                <strong className={styles.list}>
                  Comenzar reserva <ImCalendar className={styles.icons} />
                </strong>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/contacto">
              <button>
                <strong className={styles.list}>
                  Contacto <RiMailLine className={styles.icons} />
                </strong>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/nosotros">
              <button>
                <strong className={styles.list}>
                  Nosotros <RiTeamLine className={styles.icons} />
                </strong>
              </button>
            </Link>
          </li>
          <li>
            {logeduser.admin ? (
              <Link to="/admin">
                <button>
                  <strong className={styles.list}>
                    Administrador <RiAdminFill className={styles.icons} />
                  </strong>
                </button>
              </Link>
            ) : (
              <div></div>
            )}
          </li>
        </div>
        <div className={styles.logins}>
          {!logeduser.token ? (
            <div>
              <Link to="/iniciarsesion">
                <li>
                  <button className={styles.signlog}>
                    <strong className={styles.list}>
                      Iniciar Sesion <GoSignIn className={styles.icons} />{" "}
                    </strong>
                  </button>
                </li>
              </Link>
              <Link to="/registrarse">
                <li>
                  <button className={styles.signlog}>
                    <strong className={styles.list}>
                      Registrarse
                      <RiLoginBoxLine className={styles.icons} />
                    </strong>
                  </button>
                </li>
              </Link>
            </div>
          ) : (
            <Link to="/">
              <li>
                <button className={styles.signlog} onClick={() => Logout()}>
                  <strong className={styles.list}>
                    Cerrar Sesion <RiLoginBoxLine className={styles.icons} />
                  </strong>
                </button>
              </li>
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
}

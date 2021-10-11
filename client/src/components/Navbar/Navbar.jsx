import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from "react-icons/ri";
import { GoSignIn, GoHome } from "react-icons/go";
import { ImCalendar } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { GiPhotoCamera } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { SiCashapp } from 'react-icons/si';
import styles from "./Navbar.module.css";
import axios from "axios";
import { BiWindows } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);
  const username = userData && userData.UserName;
  const ID = user && user.userid;
  useEffect(() => {
    dispatch(getUserData(ID))
  },[dispatch])

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
            <Link to='/galeria' ><button><strong>Galeria <span className={styles.span}><GiPhotoCamera /></span></strong></button></Link>
          </li>
          <li>
            {logeduser.admin ? (
              <>
              <Link to="/admin">
                <button>
                  <strong className={styles.list}>
                    Administrador <RiAdminFill className={styles.icons} />
                  </strong>
                </button>
              </Link>
              
              <Link to="/admin/caja">
                <button>
                  <strong className={styles.list}> 
                    Caja <SiCashapp className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </>
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
            <div>
              <Link to={`/${user.user}`}>
                <li>
                  <button className={styles.signlog} >
                    <strong className={styles.list} >
                      Perfil <CgProfile className={styles.icons} />
                    </strong>
                  </button>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <button className={styles.signlog} onClick={() => Logout()}>
                    <strong className={styles.list}>
                      Cerrar Sesion <RiLoginBoxLine className={styles.icons} />
                    </strong>
                  </button>
                </li>
              </Link>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

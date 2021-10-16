import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from "react-icons/ri";
import { GoSignIn, GoHome } from "react-icons/go";
import { ImCalendar } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { GiHamburgerMenu, GiPhotoCamera } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { SiCashapp } from "react-icons/si";
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
    dispatch(getUserData(ID));
  }, [dispatch]);

  let logeduser = useSelector((state) => state.user);
  if (logeduser === null) {
    logeduser = {};
    logeduser.admin = false;
    logeduser.token = false;
  }
  const Logout = () => {
    localStorage.removeItem("LogedUser");
    alert("Hasta pronto");
    window.location.href = "/";
  };

  return (
    <div>
      <nav>
        <ul className={styles.navbar}>
          <div className={styles.navbar2}>
            <div className={styles.hamburguesa}>
              <div className={styles.burger}>
                <details className={styles.list}>
                  <summary>
                     Menú<GiHamburgerMenu className={styles.icons} />
                  </summary>
                  <ul>
                    <li className={styles.mostrar}>
                      <Link to="/" >
                        <button>
                          <strong className={styles.list}>
                            Inicio <GoHome className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li className={styles.mostrar}>
                      <Link to="/reserva" >
                        <button>
                          <strong className={styles.list}>
                            Comenzar reserva{" "}
                            <ImCalendar className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li className={styles.mostrar}>
                      <Link to="/contacto" >
                        <button>
                          <strong className={styles.list}>
                            Contacto <RiMailLine className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li className={styles.mostrar}>
                      <Link to="/nosotros" >
                        <button>
                          <strong className={styles.list}>
                            Nosotros <RiTeamLine className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li className={styles.mostrar}>
                      <Link to="/galeria" >
                        <button>
                          <strong>
                            Galeria{" "}
                            <span className={styles.span}>
                              <GiPhotoCamera />
                            </span>
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li className={styles.mostrar}>
                      {logeduser.admin ? (
                        <>
                          <Link to="/admin" >
                            <button>
                              <strong className={styles.list}>
                                Administrador{" "}
                                <RiAdminFill className={styles.icons} />
                              </strong>
                            </button>
                          </Link>

                          <Link to="/admin/caja" className={styles.mostrar}>
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
                  </ul>
                  <div className={styles.logins}>
                    {!logeduser.token ? (
                      <div>
                        <Link to="/iniciarsesion" >
                          <li className={styles.mostrar}>
                            <button className={styles.signlog}>
                              <strong className={styles.list}>
                                Iniciar Sesion{" "}
                                <GoSignIn className={styles.icons} />{" "}
                              </strong>
                            </button>
                          </li>
                        </Link>
                        <Link to="/registrarse" >
                          <li className={styles.mostrar}>
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
                        <Link
                          to={`/Profile/${user.user}`}
                          
                        >
                          <li className={styles.mostrar}>
                            <button className={styles.signlog}>
                              <strong className={styles.list}>
                                Perfil <CgProfile className={styles.icons} />
                              </strong>
                            </button>
                          </li>
                        </Link>
                        <Link to="/" >
                          <li className={styles.mostrar}>
                            <button
                              className={styles.signlog}
                              onClick={() => Logout()}
                            >
                              <strong className={styles.list}>
                                Cerrar Sesion{" "}
                                <RiLoginBoxLine className={styles.icons} />
                              </strong>
                            </button>
                          </li>
                        </Link>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
            <li>
              <Link to="/" className={styles.noMostrar}>
                <button>
                  <strong className={styles.list}>
                    Inicio <GoHome className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/reserva" className={styles.noMostrar}>
                <button>
                  <strong className={styles.list}>
                    Comenzar reserva <ImCalendar className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/contacto" className={styles.noMostrar}>
                <button>
                  <strong className={styles.list}>
                    Contacto <RiMailLine className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className={styles.noMostrar}>
                <button>
                  <strong className={styles.list}>
                    Nosotros <RiTeamLine className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/galeria" className={styles.noMostrar}>
                <button>
                  <strong>
                    Galeria{" "}
                    <span className={styles.span}>
                      <GiPhotoCamera />
                    </span>
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              {logeduser.admin ? (
                <>
                  <Link to="/admin" className={styles.noMostrar}>
                    <button>
                      <strong className={styles.list}>
                        Administrador <RiAdminFill className={styles.icons} />
                      </strong>
                    </button>
                  </Link>

                  <Link to="/admin/caja" className={styles.noMostrar}>
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
                <Link to="/iniciarsesion" className={styles.noMostrar}>
                  <li>
                    <button className={styles.signlog}>
                      <strong className={styles.list}>
                        Iniciar Sesion <GoSignIn className={styles.icons} />{" "}
                      </strong>
                    </button>
                  </li>
                </Link>
                <Link to="/registrarse" className={styles.noMostrar}>
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
                <Link to={`/Profile/${user.user}`} className={styles.noMostrar}>
                  <li>
                    <button className={styles.signlog}>
                      <strong className={styles.list}>
                        Perfil <CgProfile className={styles.icons} />
                      </strong>
                    </button>
                  </li>
                </Link>
                <Link to="/" className={styles.noMostrar}>
                  <li>
                    <button className={styles.signlog} onClick={() => Logout()}>
                      <strong className={styles.list}>
                        Cerrar Sesion{" "}
                        <RiLoginBoxLine className={styles.icons} />
                      </strong>
                    </button>
                  </li>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </nav>
      <script></script>
    </div>
  );
}

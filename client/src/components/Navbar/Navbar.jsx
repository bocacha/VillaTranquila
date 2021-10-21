import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine, } from "react-icons/ri";
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
import { IoIosCheckmark } from "react-icons/io";

export default function Navbar() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
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
            <div className={styles.navbarResp}>
              <div className={styles.navbarRespp}>
                <button
                  type="button"
                  onClick={() => {
                    setShow(!show);
                  }}
                  className={styles.botonHamb} 
                >
                  <GiHamburgerMenu className={styles.menu}/>
                </button>
              </div>
              {show ? (
                <div className={styles.containerResp}>
                  <div className={styles.liRes}>
                    <li>
                      <Link to="/" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Inicio <GoHome className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/reserva" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Comenzar reserva{" "}
                            <ImCalendar className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contacto" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Contacto <RiMailLine className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/nosotros" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Nosotros <RiTeamLine className={styles.icons} />
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/galeria" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Galeria{" "}
                            <span className={styles.span}>
                              <GiPhotoCamera />
                            </span>
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/testimonial" className={styles.mostrar}>
                        <button className={styles.navBtn}>
                          <strong className={styles.list}>
                            Testiomonial{" "}
                            <span className={styles.span}>
                              <IoIosCheckmark />
                            </span>
                          </strong>
                        </button>
                      </Link>
                    </li>
                    <li>
                      {logeduser.admin ? (
                        <>
                          <Link to="/admin" className={styles.mostrar}>
                            <button className={styles.navBtn}>
                              <strong className={styles.list}>
                                Administrador{" "}
                                <RiAdminFill className={styles.icons} />
                              </strong>
                            </button>
                          </Link>

                          <Link to="/admin/caja" className={styles.mostrar}>
                            <button className={styles.navBtn}>
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
                        <Link to="/iniciarsesion" className={styles.mostrar}>
                          <li>
                          <button className={styles.navBtn}>
                              <strong className={styles.list}>
                                Iniciar Sesion{" "}
                                <GoSignIn className={styles.icons} />{" "}
                              </strong>
                            </button>
                          </li>
                        </Link>
                        <Link to="/registrarse" className={styles.mostrar}>
                          <li>
                          <button className={styles.navBtn}>
                              <strong className={styles.list}>
                              Registrarse{" "}
                                <RiLoginBoxLine className={styles.icons} />{" "}
                              </strong>
                            </button>
                          </li>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link
                          to={`/Profile/${user.user}`}
                          className={styles.mostrar}
                        >
                          <li>
                          <button className={styles.navBtn}>
                              <strong className={styles.list}>
                                Perfil <CgProfile className={styles.icons} />
                              </strong>
                            </button>
                          </li>
                        </Link>
                        <Link to="/" className={styles.mostrar}>
                          <li>
                            <button
                              className={styles.navBtn}
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
                </div>
              ) : (
                <></>
              )}
            </div>

            <li>
              <Link to="/" className={styles.noMostrar}>
                <button className={styles.navBtn}>
                  <strong className={styles.list}>
                    Inicio <GoHome className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/reserva" className={styles.noMostrar}>
                <button className={styles.navBtn}>
                  <strong className={styles.list}>
                    Comenzar reserva <ImCalendar className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/contacto" className={styles.noMostrar}>
                <button className={styles.navBtn}>
                  <strong className={styles.list}>
                    Contacto <RiMailLine className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className={styles.noMostrar}>
                <button className={styles.navBtn}>
                  <strong className={styles.list}>
                    Nosotros <RiTeamLine className={styles.icons} />
                  </strong>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/galeria" className={styles.noMostrar}>
                <button className={styles.navBtn}>
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
              <Link to="/testimonial" className={styles.mostrar}>
                    <button className={styles.navBtn}>
                       <strong className={styles.list}>
                          Reseñas{" "}
                        <span className={styles.span}>
                          <IoIosCheckmark />
                        </span>
                      </strong>
                    </button>
                  </Link>
              </li>
            <li>
              {logeduser.admin ? (
                <>
                  <Link to="/admin" className={styles.noMostrar}>
                    <button className={styles.navBtn}>
                      <strong className={styles.list}>
                        Administrador <RiAdminFill className={styles.icons} />
                      </strong>
                    </button>
                  </Link>

                  <Link to="/admin/caja" className={styles.noMostrar}>
                    <button className={styles.navBtn}>
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
                  <button className={styles.navBtn}>
                      <strong className={styles.list}>
                        Iniciar Sesion <GoSignIn className={styles.icons} />{" "}
                      </strong>
                    </button>
                  </li>
                </Link>
                <Link to="/registrarse" className={styles.noMostrar}>
                  <li>
                  <button className={styles.navBtn}>
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
                  <button className={styles.navBtn}>
                      <strong className={styles.list}>
                        Perfil <CgProfile className={styles.icons} />
                      </strong>
                    </button>
                  </li>
                </Link>
                <Link to="/" className={styles.noMostrar}>
                  <li>
                  <button className={styles.navBtn} onClick={() => Logout()}>
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

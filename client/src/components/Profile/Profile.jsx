import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile, getUserData, Logeduser, Loguser } from "../../actions";
import styles from "./Profile.module.css";
import Navbar from "../Navbar/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsBook, BsPen } from "react-icons/bs";
import { ImCancelCircle } from 'react-icons/im';
import { GiCutDiamond } from 'react-icons/gi';
import { BiSave } from 'react-icons/bi';

export default function Profile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);
  const username = !userData ?
    user.user :
    userData.UserName;
  useEffect(() => {
    dispatch(getUserData(username));
  }, [dispatch, username]);

  const dataUser = useSelector((state) => state.userData);

  const [edit, setEdit] = useState({
    UserName: dataUser.UserName,
    FirstName: dataUser.FirstName,
    LastName: dataUser.LastName,
    Address: dataUser.Address,
    Phone: dataUser.Phone,
    Email: dataUser.Email,
    UserPassword: "",
  });

  const [mostrar, setMostrar] = useState(false);

  function handleMostrar(e) {
    e.preventDefault();
    if (mostrar) {
      setMostrar(false);
    } else {
      setMostrar(true);
    }
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    console.log("submit", edit)
    if (edit.UserPassword.length < 1) {
      return alert("Debe ingresar su contraseña para guardar los cambios");
    } else {
      const ID = user.userid;
      alert("Perfil editado con éxito");
      dispatch(editProfile(edit, ID));
      dispatch(Logeduser());
      setMostrar(false);
      window.location.reload();
    }
  }

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      UserName: edit.UserName || dataUser.UserName,
      FirstName: edit.FirstName || dataUser.FirstName,
      LastName: edit.LastName || dataUser.LastName,
      Address: edit.Address || dataUser.Address,
      Phone: edit.Phone || dataUser.Phone,
      Email: edit.Email || dataUser.Email,
      [e.target.name]: e.target.value,
    });
  }


  return (
    <div className={styles.perfil}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerDatos}>
          <button className={styles.editarPerfil} onClick={handleMostrar}>
            {mostrar ? (
              <div><strong>Cancelar <p><ImCancelCircle /></p></strong></div>
            ) : (
              <div>
                <strong>Editar datos <p><BsPen /></p></strong>
              </div>
            )}
          </button>
          {/* <ul className={styles.datos}>
          <li className={styles.dato}>
            <span>Nombre de usuario: </span><p>{dataUser.UserName}</p>
          </li>
          <li className={styles.dato}>
            <span>Nombre: </span><p>{dataUser.FirstName}</p>
          </li>
          <li className={styles.dato}>
            <span>Apellido: </span><p>{dataUser.LastName}</p>
          </li>
          <li className={styles.dato}>
            <span>Dirección: </span><p>{dataUser.Address}</p>
          </li>
          <li className={styles.dato}>
            <span>Teléfono: </span><p>{dataUser.Phone}</p>
          </li>
          <li className={styles.dato}>
            <span>E-mail: </span><p>{dataUser.Email}</p>
          </li>
          <li className={styles.dato}>
            <details>
              <summary>Historial de reservas</summary>
              {dataUser.ReservationsHistory &&
                dataUser.ReservationsHistory.length ? (
                dataUser.ReservationsHistory.map((el) => {
                  return <p>{el}</p>;
                })
              ) : (
                <div>
                  <p>
                    Haz tu primer reserva aquí <FaLongArrowAltRight />
                  </p>
                  <Link to="/reserva">
                    <button>
                      <BsBook />
                    </button>
                  </Link>
                </div>
              )}
            </details>
          </li>
          <li className={styles.dato}>
            {dataUser.Premium ? (
              <span>Usuario Premium </span>
            ) : (
              <div>
                <span>
                  Conviertete en cliente Premium completando tu primer reserva{" "}
                  <FaLongArrowAltRight />
                </span>
                <Link to="/reserva">
                  <button>
                    {" "}
                    <BsBook />{" "}
                  </button>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div> */}

          <table>
            <tbody>
              <tr>
                <td className={styles.izqu}>Nombre de usuario:</td>
                <td className={styles.der}>{dataUser.UserName}</td>
              </tr>
              <tr>
                <td className={styles.izqu}>Nombre:</td>
                <td className={styles.der}>{dataUser.FirstName}</td>
              </tr>
              <tr>
                <td className={styles.izqu}>Apellido:</td>
                <td className={styles.der}>{dataUser.LastName}</td>
              </tr>
              <tr>
                <td className={styles.izqu}>Dirección:</td>
                <td className={styles.der}>{dataUser.Address}</td>
              </tr>
              <tr>
                <td className={styles.izqu}>Teléfono:</td>
                <td className={styles.der}>{dataUser.Phone}</td>
              </tr>
              <tr>
                <td className={styles.izqu}>E-mail:</td>
                <td className={styles.der}>{dataUser.Email}</td>
              </tr>
            </tbody>
          </table>
          <details>
            <summary>Historial de reservas</summary>
            {dataUser.ReservationsHistory &&
              dataUser.ReservationsHistory.length ? (
              dataUser.ReservationsHistory.map((el) => {
                return <p>{el}</p>;
              })
            ) : (
              <div className={styles.reserva}>
                <p>
                  Haz tu primer reserva aquí <FaLongArrowAltRight />
                </p>
                <Link to="/reserva">
                  <button className={styles.botonReserva}>
                    <BsBook />
                  </button>
                </Link>
              </div>
            )}
          </details>
          <div className={styles.premium}>
            {dataUser.Premium ? (
              <span>Usuario Premium <GiCutDiamond className={styles.diamond} /></span>
            ) : (
              <div>
                <span>
                  Conviertete en cliente Premium completando tu primer reserva <FaLongArrowAltRight />
                </span>
                <Link to="/reserva">
                  <button className={styles.botonPrem} >
                    <BsBook />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {mostrar ? (
          <div className={styles.editarCont}>
            <div className={styles.title}><strong> Editar perfil</strong></div>
            <form className={styles.form} onSubmit={(e) => handleSubmitEdit(e)}>
              <input
                type="text"
                defaultValue={dataUser.UserName}
                name="UserName"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nuevo nombre de usuario"
                className={styles.formInputs}
              />
              <input
                type="text"
                defaultValue={dataUser.FirstName}
                name="FirstName"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nuevo nombre"
                className={styles.formInputs}
              />
              <input
                type="text"
                defaultValue={dataUser.LastName}
                name="LastName"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nuevo apellido"
                className={styles.formInputs}
              />
              <input
                type="text"
                defaultValue={dataUser.Address}
                name="Address"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nueva dirección"
                className={styles.formInputs}
              />
              <input
                type="text"
                defaultValue={dataUser.Phone}
                name="Phone"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nuevo teléfono"
                className={styles.formInputs}
              />
              <input
                type="text"
                defaultValue={dataUser.Email}
                name="Email"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Nuevo email "
                className={styles.formInputs}
              />
              <input
                type="password"
                defaultValue={edit.UserPassword}
                name="UserPassword"
                onChange={(e) => handleChangeEdit(e)}
                placeholder="Introduzca su contraseña"
                className={styles.formInputs}
              />
              <button type="submit" onSubmit={(e) => handleSubmitEdit(e)} className={styles.editarPerfil} id={styles.guardar}>
                Guardar cambios <p><BiSave /></p>
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

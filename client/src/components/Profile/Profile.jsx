import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile, getUserData, Logeduser } from "../../actions";
import styles from "./Profile.module.css";
import Navbar from "../Navbar/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsBook, BsPen } from "react-icons/bs";
// import { IoDiamond } from 'react-icons/io5';

export default function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  const username = user.user;
  const dataUser = useSelector((state) => state.userData);
  const [mostrar, setMostrar] = useState(false);
  const [edit, setEdit] = useState({
    UserName: dataUser.UserName,
    FirstName: dataUser.FirstName,
    LastName: dataUser.LastName,
    Address: dataUser.Address,
    Phone: dataUser.Phone,
    Email: dataUser.Email,
    UserPassword: "",
  });

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
      setMostrar(false);
      window.location.reload();
    }
  }

  function handleChangeEdit(e) {
    setEdit({
      ...edit,
      UserName: edit.UserName || dataUser.UserName,
      FirstName: edit.FirstName ||dataUser.FirstName,
      LastName: edit.LastName ||dataUser.LastName,
      Address: edit.Address ||dataUser.Address,
      Phone: edit.Phone ||dataUser.Phone,
      Email: edit.Email ||dataUser.Email,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getUserData(username));
  }, [dispatch, username]);

  return (
    <div className={styles.perfil}>
      <Navbar />
      <button className={styles.editarPerfil} onClick={handleMostrar}>
        {mostrar ? (
          <div>Cancelar</div>
        ) : (
          <div>
            Editar datos <BsPen />
          </div>
        )}
      </button>
      <ul className={styles.datos}>
        <li>
          <span>Nombre de usuario: {dataUser.UserName}</span>
        </li>
        <li>
          <span>Nombre: {dataUser.FirstName}</span>
        </li>
        <li>
          <span>Apellido: {dataUser.LastName}</span>
        </li>
        <li>
          <span>Dirección: {dataUser.Address}</span>
        </li>
        <li>
          <span>Teléfono: {dataUser.Phone}</span>
        </li>
        <li>
          <span>E-mail: {dataUser.Email}</span>
        </li>
        <li>
          <details>
            <summary>Historial de reservas</summary>
            {dataUser.ReservationsHistory &&
            dataUser.ReservationsHistory.length ? (
              dataUser.ReservationsHistory.map((el) => {
                return <p>{el}</p>;
              })
            ) : (
              <div>
                <span>
                  Haz tu primer reserva aquí <FaLongArrowAltRight />
                </span>
                <Link to="/reserva">
                  <button>
                    <BsBook />
                  </button>
                </Link>
              </div>
            )}
          </details>
        </li>
        <li>
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
      {mostrar ? (
        <div className={styles.editarCont}>
          <div className={styles.title}> Editar perfil</div>
          <form className={styles.form} onSubmit={(e) => handleSubmitEdit(e)}>
            <input
              type="text"
              defaultValue={dataUser.UserName}
              name="UserName"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nuevo nombre de usuario"
              className={styles.formInputs}
              title='Debe contener mayusculas minusculas y numeros '
              pattern='^[0-9a-zA-Z\s]+$'
              required
            />
            <input
              type="text"
              defaultValue={dataUser.FirstName}
              name="FirstName"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nuevo nombre"
              className={styles.formInputs}
              title='Solo letras'
              pattern='[a-zA-Z ]{2,254}'
              required
            />
            <input
              type="text"
              defaultValue={dataUser.LastName}
              name="LastName"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nuevo apellido"
              className={styles.formInputs}
              title='Solo letras'
              pattern='[a-zA-Z ]{2,254}'
              required
            />
            <input
              type="text"
              defaultValue={dataUser.Address}
              name="Address"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nueva dirección"
              className={styles.formInputs}
              title='Debe contener mayusculas minusculas y numeros '
              pattern='^[0-9a-zA-Z\s]+$'
              required
            />
            <input
              type="text"
              defaultValue={dataUser.Phone}
              name="Phone"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nuevo teléfono"
              className={styles.formInputs}
              maxLength="17" 
              minLength="8" 
              pattern="[+]{2}[0-9]{10-14}"
              placeholder="+54 9 11 12345678" 
              required
            />
            <input
              type="email"
              defaultValue={dataUser.Email}
              name="Email"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Nuevo email "
              className={styles.formInputs}
              pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
              required
            />
            <input
              type="password"
              defaultValue={edit.UserPassword}
              name="UserPassword"
              onChange={(e) => handleChangeEdit(e)}
              placeholder="Introduzca su contraseña"
              className={styles.formInputs}
              required
            />
            <button type="submit" onSubmit={(e) => handleSubmitEdit(e)}>
              Guardar cambios
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

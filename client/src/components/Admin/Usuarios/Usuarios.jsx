import React, { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, readUsers, editUsers, Logeduser, readUsersocultados} from "../../../actions";
import UsuariosDetail from "./UsuariosDetail";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.usuarios);
  const logeduser = useSelector ((state) => state.user);
  const [mostrar, setMostrar] = useState(false);
  const [habilitar, setHabilitar]= useState(false)
  const {token} = logeduser
  const [input, setInput] = useState({
    id: "",
    UserName: "",
    UserPassword: "",
    FirstName: "",
    LastName: "",
    Address: "",
    Phone: "",
    Email: "",
    Admin: "",
    Premium: false,
    Blocked: false,
  });
  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readUsers({ token }));
  }, [dispatch, token]);
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

  function handleSubmitEdit(e, ID) {
   // const { token } = logeduser;
    e.preventDefault();
    dispatch(editUsers(input));
    setMostrar(true);
    //alert("Usuario editado con éxito");
    setInput({
      ...input,
      id: ID,
    });
    //dispatch(readUsers({ token }));
    //window.location.reload();
  }
  function handlePrueba(e, ID) {
    // const { token } = logeduser;
     e.preventDefault();
     dispatch(editUsers(input));
     setMostrar(true);
     //alert("Usuario editado con éxito");
     setInput({
       ...input,
       id: ID,
     });
     //dispatch(readUsers({ token }));
     window.location.reload();
   }
const ocultadas= () => {
  const { token } = logeduser;
  dispatch(readUsersocultados({ token}))
  setHabilitar(true)
}
const showtrue=()=>{
  const { token } = logeduser;
  dispatch(readUsers({ token }))
  setHabilitar(false)
}

  return (
    <div className={styles.container}>
       {!habilitar ?(
            <button onClick={ocultadas}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue}>Mostrar habilitadas</button>
          )
          }
      {/* CREAR 
      <div>
        Crear un nuevo usuario
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={input.UserName}
            name="UserName"
            onChange={(e) => handleChange(e)}
            placeholder="Nombre de usuario" 
            pattern='^[0-9a-zA-Z]+$'
            className={styles.UserName}
            required
          />

          <input
            type="text"
            value={input.UserPassword}
            name="UserPassword"
            onChange={(e) => handleChange(e)}
            placeholder="Contraseña"
            className={styles.UserPassword}
            pattern= '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$'
            required
          />
            {/* Minimo 8 caracteres
            Maximo 15
            Al menos una letra mayúscula
            Al menos una letra minucula
            Al menos un dígito
            No espacios en blanco
            Al menos 1 caracter especial */}
      {/*
          <input
            type="text"
            value={input.FirstName}
            name="FirstName"
            onChange={(e) => handleChange(e)}
            placeholder="Nombre"
            className={styles.FirstName}
            pattern='[a-zA-Z ]{2,254}'
            required
          />

          <input
            type="text"
            value={input.LastName}
            name="LastName"
            onChange={(e) => handleChange(e)}
            placeholder="Apellido"
            className={styles.LastName}
            pattern='[a-zA-Z ]{2,254}'
            required
          />

          <input
            type="text"
            value={input.Address}
            name="Address"
            onChange={(e) => handleChange(e)}
            placeholder="Direccion"
            pattern='^[0-9a-zA-Z]+$'
            className={styles.Address}
            required
          />

          <input
            type="text"
            value={input.Phone}
            name="Phone"
            onChange={(e) => handleChange(e)}
            placeholder="Teléfono"
            className={styles.Phone}
            maxLength="17" 
            minLength="10" 
            pattern="[+]{2}[0-9]{10-14}" 
            placeholder="+54 9 11 12345678" 
            required
          />

          <small>Ej: +54 9 11 12345678 </small>

          <input
            type="email"
            value={input.Email}
            name="Email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
            className={styles.Email}
            required
          />

          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Crear
            </button>
          </div>
        </form>
*/}
      <div className={styles.btnVolver}>
        <Link to="/admin">
          <button className={styles.btn}>Volver</button>
        </Link>
      </div>
      <div className={styles.container2}>
      <div className={styles.formsCont}>
        {/* editar */}
        {mostrar ? 
            <div className={styles.crearCont}>
            <div className={styles.title}> Editar un nuevo usuario</div>
            <form className={styles.form}>
              <input
                type="text"
                value={input.UserName}
                name="UserName"
                onChange={(e) => handleChange(e)}
                placeholder="Nombre de usuario"
                className={styles.formInputs}
                pattern='^[0-9a-zA-Z\s]+$'
                title='debe contener letras y numeros'
                required
              />
              <input
                type="text"
                value={input.UserPassword}
                name="UserPassword"
                onChange={(e) => handleChange(e)}
                placeholder="Contraseña del usuario"
                className={styles.formInputs}
                title='Debe contener mayusculas, minusculas, numeros y caracter especial'
                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$'
                required
              />
              <input
                type="text"
                value={input.FirstName}
                name="FirstName"
                onChange={(e) => handleChange(e)}
                placeholder="Nombre"
                className={styles.formInputs}
                title='Solo letras'
                pattern='[a-zA-Z ]{2,254}'
                required
              />
              <input
                type="text"
                value={input.LastName}
                name="LastName"
                onChange={(e) => handleChange(e)}
                placeholder="Apellido"
                className={styles.formInputs}
                title='Solo letras'
                pattern='[a-zA-Z ]{2,254}'
                required
              />
              <input
                type="text"
                value={input.Address}
                name="Address"
                onChange={(e) => handleChange(e)}
                placeholder="Dirección"
                className={styles.formInputs}
                pattern='^[0-9a-zA-Z\s]+$'
                required
              />
              <input
                type="text"
                value={input.Phone}
                name="Phone"
                onChange={(e) => handleChange(e)}
                placeholder="Télefono"
                className={styles.formInputs}
                maxLength="17" 
                minLength="10" 
                pattern="[+]{2}[0-9]{10-14}" 
                placeholder="+54 9 11 12345678" 
                required
              />
              <input
                type="text"
                value={input.Email}
                name="Email"
                onChange={(e) => handleChange(e)}
                placeholder="E-mail"
                className={styles.formInputs}
                pattern='^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$'
                required
              />
              <select
                onChange={(e) => handleSelectAdmin(e)}
                value={input.Admin}
                className={styles.formInputs}
                required
              >
                <option value="">Admin:</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              {/* <select
              onChange={(e) => handleSelectPremium(e)}
              value={input.Premium}
              className={styles.formInputs}
              required
            >
              <option value="">Premium:</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select> */}
              {/* <select
              onChange={(e) => handleSelectBlocked(e)}
              value={input.Blocked}
              className={styles.formInputs}
              required
            >
              <option value="">Blocked:</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select> */}
              <div className={styles.btns}>
                <button type="submit" className={styles.btn}>
                  Editar
                </button>
              </div>
            </form>
          </div>
        : 
            null       
            }
        
        
      </div>
      {/* VER */}
      <div>
        {allUsers?.map((el)=>(           
            <div className={styles.detalles} key={el.ID}>
              <UsuariosDetail
                ID={el.ID}
                UserName={el.UserName}
                FirstName={el.FirstName}
                LastName={el.LastName}
                Address={el.Address}
                Phone={el.Phone}
                Email={el.Email}
                Admin={el.Admin}
                handlePrueba={handlePrueba}
                handleSubmitEdit={handleSubmitEdit}
                restaurar={habilitar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

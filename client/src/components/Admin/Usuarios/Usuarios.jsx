import React, { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, readUsers, editUsers, Logeduser, readUsersocultados } from "../../../actions";
import UsuariosDetail from "./UsuariosDetail";
import { Link } from "react-router-dom";
import NavAdmin from '../NavAdmin/NavAdmin';
import Navbar from "../../Navbar/Navbar";
import SearchBar from "./SearchBar";

function validation(input) {
  var letras = "abcdefghyjklmnñopqrstuvwxyz";
  var letras_m = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  var num = "0123456789";

  let errors = {}


  if (!/[0-9]/.test(input.UserName)) {
    errors.UserName = "Debe contener un número";
  } else if (!/[a-z]/.test(input.UserName)) {
    errors.UserName = "Debe contener letras minusculas";
  } else if (!/[A-Z]/.test(input.UserName)) {
    errors.UserName = "Debe contener letras mayusculas ";
  } else if (!/[0-9]/.test(input.UserPasssword)) {
    errors.UserPasssword = "Debe contener un número";
  } else if (!/[a-z]/.test(input.UserPasssword)) {
    errors.UserPasssword = "Debe contener letras minusculas";
  } else if (!/[A-Z]/.test(input.UserPasssword)) {
    errors.UserPasssword = "Debe contener letras mayusculas ";
  } else if (!/[a-zA-Z]/.test(input.FirstName)) {
    errors.FirstName = "Debe contener solo letras";
  } else if (!/[a-zA-Z]/.test(input.LastName)) {
    errors.LastName = "Debe contener solo letras";
  } else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(input.Email)) {
    errors.Email = "Debe ser un email valido";
  }


  return errors;
}

export default function Usuarios() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.usuarios);
  const [errors, setErrors] = useState({});
  const logeduser = useSelector((state) => state.user);
  const [mostrar, setMostrar] = useState(false);
  const [habilitar, setHabilitar] = useState(false)
  const { token } = logeduser
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
    UserDNI:"",
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
    console.log(e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validation({
      ...input, [e.target.name]: e.target.value
    }));
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

  function handleSubmitEdit(e, ID,
    UserName,
    Admin,
    FirstName,
    LastName,
    Address,
    Phone,
    UserDNI,
    Email,
    ) {
    e.preventDefault();

    if (errors.UserName !== undefined || errors.Email !== undefined || errors.FirstName !== undefined || errors.LastName !== undefined || errors.UserPassword !== undefined) {
      document.getElementById('form');
      return alert('No se puede crear el registro porque contiene errores');
    }
    setInput({
      ...input,
      id: ID,
      UserName: UserName,
      Admin: Admin,
      FirstName: FirstName,
      LastName: LastName,
      Address: Address,
      Phone: Phone,
      Email: Email,
      UserDNI: UserDNI,
    });
    setMostrar(true);
    //dispatch(readUsers({ token }));
    //window.location.reload();
  }
  function handlePrueba(e, ID) {
    // const { token } = logeduser;
    e.preventDefault();
    setMostrar(true);
    console.log(input)
    dispatch(editUsers(input));
    alert("Usuario editado con éxito");
    //  setInput({
    //    ...input,
    //    id: ID,
    //  });
    //dispatch(readUsers({ token }));
    window.location.reload();
  }
  const ocultadas = () => {
    const { token } = logeduser;
    dispatch(readUsersocultados({ token }))
    setHabilitar(true)
  }
  const showtrue = () => {
    const { token } = logeduser;
    dispatch(readUsers({ token }))
    setHabilitar(false)
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <NavAdmin />
      {/* {!habilitar ?(
            <button onClick={ocultadas}>Mostrar ocultadas</button>
          ):(
            <button onClick={showtrue}>Mostrar habilitadas</button>
          )
          } */}
      {/* CREAR
      <div>
        Crear un nuevo usuario
        <form onSubmit={(e) => handleSubmit(e)}>
       */}
      <div className={styles.containerTodo}>
        <div className={styles.btnsContainer}>
          {!habilitar ? (
            <button onClick={ocultadas} className={styles.btnSup}>Mostrar ocultadas</button>
          ) : (
            <button onClick={showtrue} className={styles.btnSup}>Mostrar habilitadas</button>
          )
          }
        </div>
        <SearchBar/>
        <div className={styles.container2}>
          <div className={styles.formsCont}>
            {/* editar */}
            {mostrar ?
              <div className={styles.crearCont}>
                <div className={styles.title}> Editar usuario {input.UserName}</div>
                <form id='form' className={styles.form}>
                  <input
                    type="text"
                    value={input.UserName}
                    name="UserName"
                    onChange={(e) => handleChange(e)}
                    placeholder="Nombre de usuario"
                    className={styles.formInputs}
                    required
                  />{errors.UserName && (<p>{errors.UserName}</p>)}

                  <input
                    type="text"
                    value={input.UserPassword}
                    name="UserPassword"
                    onChange={(e) => handleChange(e)}
                    placeholder="Contraseña"
                    className={styles.formInputs}
                    title='Debe contener mayusculas, minusculas, numeros'
                    //pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$'
                    required
                  />{errors.UserPassword && (<p>{errors.UserPassword}</p>)}

                  <input
                    type="text"
                    value={input.FirstName}
                    name="FirstName"
                    onChange={(e) => handleChange(e)}
                    placeholder="Nombre"
                    className={styles.formInputs}
                    required
                  />{errors.FirstName && (<p>{errors.FirstName}</p>)}

                  <input
                    type="text"
                    value={input.LastName}
                    name="LastName"
                    onChange={(e) => handleChange(e)}
                    placeholder="Apellido"
                    className={styles.formInputs}
                    required
                  />{errors.LastName && (<p>{errors.LastName}</p>)}
                  <input
                    type="text"
                    value={input.UserDNI}
                    name="UserDNI"
                    onChange={(e) => handleChange(e)}
                    placeholder="DNI"
                    className={styles.formInputs}
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
                    //placeholder="+54 9 11 12345678"
                    required
                  />
                  <input
                    type="text"
                    value={input.Email}
                    name="Email"
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                    className={styles.formInputs}
                    required
                  />{errors.Email && (<p>{errors.Email}</p>)}

                  <select
                    onChange={(e) => handleSelectAdmin(e)}
                    value={input.Admin}
                    className={styles.formInputs}
                    required
                  >
                    <option value="">Admin:</option>
                    <option value="true">SI</option>
                    <option value="false">NO</option>
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
                  {/* <div className={styles.btns}>
                <button type="submit" className={styles.btn}>
                  Editar
                </button>
              </div> */}
                </form>
                <div className={styles.guardarCancelar}>
                  <button onClick={handlePrueba} id={styles.guardar}>Guardar cambios</button>
                  <button onClick={() => mostrar && setMostrar(false)} id={styles.cancelar}>Cancelar</button>
                </div>
              </div>
              :
              null
            }


          </div>
          {/* VER */}
          <div className={styles.containerUsuarios}>
            {allUsers?.map((el) => (
              <div key={el.ID}>
                <UsuariosDetail
                  ID={el.ID}
                  UserName={el.UserName}
                  FirstName={el.FirstName}
                  LastName={el.LastName}
                  Address={el.Address}
                  Phone={el.Phone}
                  Email={el.Email}
                  Admin={el.Admin}
                  UserDNI={el.UserDNI}
                  handlePrueba={handlePrueba}
                  handleSubmitEdit={handleSubmitEdit}
                  restaurar={habilitar}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

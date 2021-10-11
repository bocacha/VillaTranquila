import React, { useState, useEffect } from "react";
import styles from "./Registro.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../../actions/index";
import { Link } from "react-router-dom";
import { Logeduser } from "../../actions";
import Navbar from "../Navbar/Navbar";
import axios from "axios";



function validation(input){
  var letras="abcdefghyjklmnñopqrstuvwxyz";
  var letras_m="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  var num = "0123456789";

  let errors={}
  

  if (!/[0-9]/.test(input.UserName)) {
    errors.UserName= "Debe contener un número";
  }else if  (!/[a-z]/.test(input.UserName)) {
    errors.UserName= "Debe contener letras minusculas";
  }else if  (!/[A-Z]/.test(input.UserName)) {
    errors.UserName= "Debe contener letras mayusculas ";
  }else if (!/[0-9]/.test(input.UserPasssword)) {
    errors.UserPasssword= "Debe contener un número";
  }else if  (!/[a-z]/.test(input.UserPasssword)) {
    errors.UserPasssword= "Debe contener letras minusculas";
  }else if  (!/[A-Z]/.test(input.UserPasssword)) {
    errors.UserPasssword= "Debe contener letras mayusculas ";
  }else if (!/[a-zA-Z]/.test(input.FirstName)){
    errors.FirstName= "Debe contener solo letras";
  }else if (!/[a-zA-Z]/.test(input.LastName)){
    errors.LastName= "Debe contener solo letras";
  }else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(input.Email)){
    errors.Email= "Debe ser un email valido";
  }


  
  return errors;
}


export default function Usuarios() {
  const [creado, setCreado] = useState(false);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
 /*  useEffect(() => {
    dispatch(Logeduser());
  }, [dispatch]); */
  const allUsers = useSelector((state) => state.usuarios);
  const [input, setInput] = useState({
    UserName: "",
    UserPassword: "",
    FirstName: "",
    LastName: "",
    Address: "",
    Phone: "",
    Email: "",
  });
  let uusername = input.UserName;
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validation({
      ...input, [e.target.name] : e.target.value
  }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (errors.UserName !== undefined || errors.Email!== undefined || errors.FirstName!== undefined || errors.LastName!== undefined  || errors.UserPassword!== undefined){
      document.getElementById('form');
      return alert('No se puede crear el registro porque contiene errores');
  }

    dispatch(createUsers(input));
    // window.location.href='/login'
    alert("Usuario creado con éxito");
  }
  const registroexitoso = async () => {
    const newuser = await axios.get("http://localhost:3001/users/");
    const existe = newuser.data.filter((e) => e.UserName === uusername);
    console.log(existe);
    if (existe) {
      if (existe.length > 0) {
        console.log(existe.length);
        setCreado(true);
        console.log(creado);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {/* CREAR */}{" "}
      {!creado ? (
        <div className={styles.containerForm}>
          <div className={styles.title}>Registrate</div>
          <form id='form'  onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <input
              type="text"
              value={input.UserName}
              name="UserName"
              onChange={(e) => handleChange(e)}
              placeholder="Nombre de Usuario"
              className={styles.formInputs}
              required
            />{errors.UserName && (<p>{errors.UserName}</p>)}  

            <input
              type="password"
              value={input.UserPassword}
              name="UserPassword"
              onChange={(e) => handleChange(e)}
              placeholder="Contraseña"
              className={styles.formInputs}
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
              value={input.Address}
              name="Address"
              onChange={(e) => handleChange(e)}
              placeholder="Direccion"
              className={styles.formInputs}
              title='Debe contener mayusculas minusculas y numeros '
              pattern='^[0-9a-zA-Z\s]+$'
              required
            />

            <input
              type="text"
              value={input.Phone}
              name="Phone"
              onChange={(e) => handleChange(e)}
              placeholder="Teléfono"
              className={styles.formInputs}
              maxLength="17" 
              minLength="8" 
              pattern="[+]{2}[0-9]{10-14}"
              placeholder="+54 9 11 12345678" 
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

            <div className={styles.btns}>
              <button
                type="submit"
                onClick={() => {
                  setTimeout(function() {
                    registroexitoso();
                  }, 3000);
                }}
                className={styles.btn}
              >
                Crear
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.container}> 
        <div className={styles.containerForm}>
      <h4> Cuenta creada </h4>
         <button className={styles.btn1}onClick={()=>{window.location.href="/iniciarsesion"}} ><strong>Iniciar Sesion</strong></button>                 
      </div>
        </div>
      )}
    </div>
  );
}

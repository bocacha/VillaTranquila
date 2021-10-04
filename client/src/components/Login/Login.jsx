import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { Loguser, Logeduser } from "../../actions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const [user, setuser] = useState({ UserName: "", UserPassword: "" });
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
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Loguser(user));
    // window.location.href='/'
  };
  const goHome =()=>{
    window.location.href='/'
  }
  let logeduser = useSelector ((state) => state.user);
  if(logeduser===null){
      logeduser = {}
      logeduser.admin = false 
      logeduser.token =false
  }
  return (
    <div className={styles.container}>
      <Navbar />
      {!logeduser.token ? (
      <div className={styles.containerForm}>
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
          <button onClick={handleLogin} className={styles.btn}>Iniciar sesión</button>
        </form>
      </div>
       ) : (
         <div className={styles.container}> 
           <div className={styles.containerForm}>
         <h4> Bienvenido/a    {logeduser.user} </h4>
            <button className={styles.btn1}onClick={goHome} ><strong>Home</strong></button>                 
         </div>
           </div>

)         
} 
    </div>
  );
}

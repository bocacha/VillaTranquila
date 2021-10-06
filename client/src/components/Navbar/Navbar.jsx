import React  from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoSignIn, GoHome } from 'react-icons/go';
import { ImCalendar } from 'react-icons/im';
import { RiAdminFill } from 'react-icons/ri';
import styles from "./Navbar.module.css";
import axios from "axios"
import { BiWindows } from "react-icons/bi";
import {useSelector } from "react-redux";

export default function Navbar() {
    let logeduser = useSelector ((state) => state.user);
    if(logeduser===null){
        logeduser = {}
        logeduser.admin = false 
        logeduser.token =false
    }
    const Logout = ()=>{
        localStorage.removeItem("LogedUser")
        alert("Good by")
        window.location.href='/'
    }
    
    return (
        <div>
            <ul className={styles.navbar} >
                <div>
                    <li>
                        <Link to='/' ><button><strong>Inicio <GoHome/></strong></button></Link>
                    </li>
                    <li>
                        <Link to='/reserva' ><button><strong>Comenzar reserva <ImCalendar /></strong></button></Link>
                    </li>
                    <li>
                        <Link to='/contacto' ><button><strong>Contacto <RiMailLine /></strong></button></Link>
                    </li>
                    <li>
                        <Link to='/nosotros' ><button><strong>Nosotros <RiTeamLine /></strong></button></Link>
                    </li>
                    <li>
                    {logeduser.admin ? (
                        <Link to='/admin' ><button><strong>Administrador <RiAdminFill /></strong></button></Link>
          ) : (
<div></div>)         
} 
                    </li>
                </div>
                <div className={styles.logins}>
                {!logeduser.token ? (
                    <div>
                        <Link to="/iniciarsesion">
                    <li >
                        <button className={styles.signlog}><strong>Iniciar Sesion <GoSignIn/> </strong></button>
                    </li>
                        </Link>
                        <Link to="/registrarse">
                    <li>
                        <button className={styles.signlog}><strong>Registrarse<RiLoginBoxLine /></strong></button>                 
                    </li>
                        </Link>                   
                    </div>
                       
          ) : (
                    <Link to="/">
                    <li>
                        <button className={styles.signlog} onClick={()=>Logout()} ><strong>Cerrar Sesion <RiLoginBoxLine /></strong></button>                 
                    </li>
                        </Link>

)         
} 
                </div>
            </ul>
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoSignIn, GoHome } from 'react-icons/go';
import { ImCalendar } from 'react-icons/im';
import { RiAdminFill } from 'react-icons/ri';
import styles from "./Navbar.module.css";
import axios from "axios"

export default function Navbar() {

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
                        <Link to='/admin' ><button><strong>Administardor <RiAdminFill /></strong></button></Link>
                    </li>
                </div>
                <div className={styles.logins}>
                    <li >
                        <Link to="/login">
                        <button className={styles.signlog}><strong>Iniciar sesión <GoSignIn/> </strong></button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Singup">
                        <button className={styles.signlog} ><strong>Registrarse <RiLoginBoxLine /></strong></button>
                        </Link>                   
                    </li>
                </div>
            </ul>
        </div>
    )
}
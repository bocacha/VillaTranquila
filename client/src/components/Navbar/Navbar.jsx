import React from "react";
import { Link } from "react-router-dom";
import { RiTeamLine, RiMailLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoSignIn, GoHome } from 'react-icons/go';
import { ImCalendar } from 'react-icons/im';
import styles from "./Navbar.module.css";

export default function Navbar() {

    return (
        <div>
            <ul className={styles.navbar} >
                <li>
                    <Link to='/' ><button><strong>Home <GoHome/></strong></button></Link>
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
                    <button><strong>Sign in <GoSignIn /></strong></button>
                </li>
                <li>
                    <button><strong>Register <RiLoginBoxLine /></strong></button>
                </li>
            </ul>
        </div>
    )
}
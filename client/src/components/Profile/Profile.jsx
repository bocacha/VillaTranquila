import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData, Logeduser } from "../../actions";
import styles from './Profile.module.css';
import Navbar from "../Navbar/Navbar";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BsBook, BsPen } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export default function Profile(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser())
    }, [dispatch]);
    const user = useSelector((state) => state.user);
    const username = user.user;

    useEffect(() => {
        dispatch(getUserData(username))
    }, [dispatch, username]);

    const dataUser = useSelector((state) => state.userData);



    return (
        <div className={styles.perfil}>
            <Navbar />
            <Link to='/editarPerfil'>
                <button className={styles.editarPerfil}>
                    Editar datos <BsPen />
                </button>
            </Link>
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
                    <span>Dirección: {dataUser.Adress}</span>
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
                        {
                            dataUser.ReservationsHistory.length ?
                                dataUser.ReservationsHistory.map(el => {
                                    return <p>{el}</p>
                                }) :
                                <div>
                                    <span>Haz tu primer reserva aquí <FaLongArrowAltRight /></span>
                                    <Link to='/reserva'><button><BsBook /></button></Link>
                                </div>
                        }
                    </details>
                </li>
                <li>
                    {
                        dataUser.Premium ?
                            <span>Usuario Premium <IoDiamond /></span> :
                            <div>
                                <span>Conviertete en cliente Premium completando tu primer reserva <FaLongArrowAltRight /></span>
                                <Link to='/reserva'><button> <BsBook /> </button></Link>
                            </div>
                    }
                </li>
            </ul>
        </div>
    )
}
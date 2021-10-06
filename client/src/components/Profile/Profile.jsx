import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData } from "../../actions";
import styles from './Profile.module.css';
import Navbar from "../Navbar/Navbar";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BsBook, BsPen } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export default function Profile(props) {
    const dispatch = useDispatch();
    const username = props.match.params.username;

    useEffect(() => {
        dispatch(getUserData(username))
    }, [dispatch, username]);

    const user = useSelector((state) => state.user);

    return (
        <div className={styles.perfil}>
            <Navbar />
            <Link to='/editarPerfil'>
                <button>
                    Editar datos <BsPen />
                </button>
            </Link>
            <ul>
                <li>
                    <span>{user.FirstName}</span>
                </li>
                <li>
                    <span>{user.LastName}</span>
                </li>
                <li>
                    <span>{user.Adress}</span>
                </li>
                <li>
                    <span>{user.Phone}</span>
                </li>
                <li>
                    <span>{user.Email}</span>
                </li>
                <li>
                    <details>
                        <summary>Historial de reservas</summary>
                        {
                            user.ReservationsHistory ?
                                user.ReservationsHistory.map(el => {
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
                        user.Premium ?
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
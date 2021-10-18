import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './SearchBar.module.css';
import { useState } from "react";
import { filterReservations } from "../../../actions";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';

export default function SearchBar() {
    const dispatch = useDispatch();
    const allReservations = useSelector((state) => state.reservaciones);
    const allUsers = useSelector((state) => state.usuarios);
    const [busqueda, setBusqueda] = useState({
        username: '',
        cabinNumber: '',
        date: ''
    });

    function handleInputChange(e) {
        e.preventDefault();
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
        console.log('busqueda:', busqueda)
    };

    function handleSubmit() {
        dispatch(filterReservations(busqueda))
    }

    function handleReload(e) {
        e.preventDefault();
        setBusqueda({
            username: '',
            cabinNumber: '',
            date: ''
        });
        window.location.reload();
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.container}>
                <span><strong>Buscá por nombre de usuario, número de cabaña o fecha de llegada:</strong></span>
                <form>
                    <input
                        type='text'
                        placeholder='Nombre de usuario'
                        name='username'
                        onChange={handleInputChange}
                        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                    />
                    <input
                        type='text'
                        placeholder='Número de cabaña'
                        name='cabinNumber'
                        onChange={handleInputChange}
                        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                    />
                    <input
                        type='date'
                        placeholder='Fecha de llegada'
                        name='date'
                        onChange={handleInputChange}
                        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                    />
                </form>
                <div>
                    <button onClick={handleSubmit} className={styles.btnSup}>Buscar <FaSearch className={styles.icon}/></button>
                    <button onClick={handleReload} className={styles.btnSup}>Recargar reservas <AiOutlineReload className={styles.icon}/></button>
                </div>
            </div>
        </div>
    )
}
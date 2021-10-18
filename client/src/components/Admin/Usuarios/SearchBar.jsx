import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { findUser } from "../../../actions";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import styles from '../Reservaciones/SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.usuarios);
    const [busqueda, setBusqueda] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setBusqueda(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(findUser(busqueda))
    }

    function handleReload(e) {
        e.preventDefault();
        setBusqueda('');
        window.location.reload();
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.container}>
                <span><strong>Buscá por nombre de usuario:</strong></span>
                <form>
                    <input style={{width:'72.7%'}} type='text' placeholder='Nombre de usuario . . .' onChange={handleInputChange} />
                </form>
                <div>
                    <button onClick={handleSubmit} className={styles.btnSup}>Buscar <FaSearch className={styles.icon} /></button>
                    <button onClick={handleReload} className={styles.btnSup} >Recargar usuarios <AiOutlineReload className={styles.icon} /></button>
                </div>
            </div>
        </div>
    )
}
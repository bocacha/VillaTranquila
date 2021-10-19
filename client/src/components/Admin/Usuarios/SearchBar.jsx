import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { findUser } from "../../../actions/index";
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

    function handleSearch(e) {
        // e.preventDefault();
        e.preventDefault();
        dispatch(findUser(busqueda));
        setBusqueda('');
    }

    function handleReload(e) {
        e.preventDefault();
        setBusqueda('');
        window.location.reload();
    }

    // function handleKeyDown(e){
    //     const key=e.keyCode;
    //     if(key === 13){
    //         e.preventDefault();
    //         dispatch(findUser(busqueda));
    //         setBusqueda('');
    //     }
    // }

    return (
        <div className={styles.searchBar}>
            <div className={styles.container}>
                <form>
                    <input
                        style={{width:'72.7%'}}
                        type='text'
                        placeholder='Buscá por nombre de usuario . . .'
                        onChange={handleInputChange}
                        // onKeyDown={(e) =>handleKeyDown(e)}
                        onKeyPress={e => e.key === 'Enter' && handleSearch(e)}
                    />
                </form>
                <div>
                    <button onClick={handleSearch} className={styles.btnSup}>Buscar <FaSearch className={styles.icon} /></button>
                    <button onClick={handleReload} className={styles.btnSup} >Recargar usuarios <AiOutlineReload className={styles.icon} /></button>
                </div>
            </div>
        </div>
    )
}
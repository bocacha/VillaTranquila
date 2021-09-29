import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Paginado from './Paginado/Paginado';
import styles from "./Reserva.module.css";
import { Link } from 'react-router-dom';
import { getCabins, filterCabinsByCapacity, filterCabinsByPrice } from "../../actions";
import {GoHome} from 'react-icons/go';
import Navbar from "../Navbar/Navbar";

export default function Reserva() {
    const dispatch = useDispatch();
    // const allCabins = useSelector((state) => state.cabins);

    // // Paginado---------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    // const [cabinsPerPage, setCabinsPerPage] = useState(9);
    // const indexOfLastCabin = currentPage * cabinsPerPage;
    // const indexOfFirstCabin = indexOfLastCabin - cabinsPerPage;
    // const currentCabins = allCabins.slice(indexOfFirstCabin, indexOfLastCabin);
    // //-------------------------------------------------------------------------

    useEffect(() => {
        dispatch(getCabins())
    }, [dispatch]);

    function handleReload(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getCabins());
    }

    function handleFilterCapacity(e){
        e.preventDefault();
        dispatch(filterCabinsByCapacity(e.target.value))
    }

    function handleFilterPrice(e){
        e.preventDefault();
        dispatch(filterCabinsByPrice(e.target.value))
    }

    return (
        <div>
            <Navbar/>
            <ul className={styles.reserva}>
                <li>
                    <button className={styles.reload} onClick={e => handleReload(e)}>Recargar todas las cabañas</button>
                </li>
                <hr/>
                <li>
                    <label>Fecha de check in: </label>
                    <input
                        type="datetime-local"
                        placeholder='Ingrese su fecha de llegada aquí...'
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label>Fecha de check out: </label>
                    <input
                        type="datetime-local"
                        placeholder='Ingrese su fecha de salida aquí...'
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label>Cantidad de personas: </label>
                    <select onChange={e => handleFilterCapacity(e)}>
                        <option value='selected' hidden>Personas</option>
                        <option value='all'>Todavía no sé</option>
                        <option value='2' >2</option>
                        <option value='4' >4</option>
                        <option value='6' >6</option>
                        <option value='8' >8</option>
                    </select>
                </li>
                <li>
                    <label>Rango de precios por noche en pesos: </label>
                    <select onChange={e => handleFilterPrice(e)} >
                        <option value='selected' hidden>Precio</option>
                        <option value='all'>No tengo un precio definido</option>
                        <option value='1500'>$1500</option>
                        <option value='2500'>$2500</option>
                        <option value='3500'>$3500</option>
                        <option value='4500'>$4500</option>
                    </select>
                </li>
            </ul >

            {/* <Paginado cabinsPerPage={cabinsPerPage} allCabins={allCabins.length} paginado={paginado} /> */}

            {/* {
                currentCabins?.map(el => {
                    return (
                        <div key={el.number} >
                            <Cabaña 
                                number={el.number}
                                capacity={el.capacity}
                                available={el.available}
                                price={el.price}
                                description={el.description}
                                img={el.img} />
                        </div>
                    )
                })
            } */}

            {/* <Paginado cabinsPerPage={cabinsPerPage} allCabins={allCabins.length} paginado={paginado} /> */}
        </div >
    )
}
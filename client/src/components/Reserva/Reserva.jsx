import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCabins, filterCabinsByCapacity, filterCabinsByPrice, filterCabinsByServices } from "../../actions";
import Paginado from './Paginado/Paginado';
import Navbar from "../Navbar/Navbar";
import Cabaña from "./Cabaña/Cabaña";
import styles from "./Reserva.module.css";
import { FaWifi, FaCarAlt, FaGamepad } from 'react-icons/fa';
import { GiVacuumCleaner, GiCampCookingPot } from 'react-icons/gi';
import { IoMdPeople } from 'react-icons/io';
import { MdAttachMoney, MdRoomService } from 'react-icons/md';
import { ImCalendar, ImSearch } from 'react-icons/im';
import { AiOutlineReload } from 'react-icons/ai';
import RangeSlider from "./Slider/Slider";

export default function Reserva() {
    const dispatch = useDispatch();
    const allCabins = useSelector(state => state.cabins);

    // Paginado---------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [cabinsPerPage, setCabinsPerPage] = useState(9);
    const indexOfLastCabin = currentPage * cabinsPerPage;
    const indexOfFirstCabin = indexOfLastCabin - cabinsPerPage;
    const currentCabins = allCabins.slice(indexOfFirstCabin, indexOfLastCabin);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //-------------------------------------------------------------------------

    useEffect(() => {
        dispatch(getCabins())
    }, [dispatch]);



    function handleReload(e) {
        e.preventDefault();
        //setCurrentPage(1);
        dispatch(getCabins());
    }

    function handleFilterCapacity(e) {
        e.preventDefault();
        dispatch(filterCabinsByCapacity(e.target.value))
    }

    function handleFilterPrice(e) {
        e.preventDefault();
        dispatch(filterCabinsByPrice(e.target.value))
    }

    var status = [];
    function handleCheck(e) {
        let name = e.target.name;
        if (status.includes(name)) {
            status = status.filter(el => el !== name);
        }
        else {
            status.push(name);
        }
        console.log(name, status);
        dispatch(filterCabinsByServices(status));
    }

    return (
        <div>
            <Navbar className={styles.navbar} />
            <ul className={styles.reserva}>
                <li>
                    <button className={styles.reload} onClick={e => handleReload(e)}>Limpiar filtros <AiOutlineReload /></button>
                </li>
                <hr />
                <li>
                    <label><ImCalendar /> Fecha de llegada: </label>
                    <input
                        type="date"
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label><ImCalendar /> Fecha de salida: </label>
                    <input
                        type="date"
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label><IoMdPeople /> Cantidad de personas </label>
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
                    <label><MdAttachMoney /> Precio por noche en pesos </label>
                    {/*SLIDER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
                    <RangeSlider />
                </li>
                <li>
                    <hr />
                    <label className={styles.serviceTitle}><MdRoomService /> Que cuente con:</label>
                    <ul className={styles.serviceCont}>
                        <li>
                            <label>Wifi <FaWifi /></label>
                            <input type='checkbox' name='Wifi' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                        <li>
                            <label>Parrilla <GiCampCookingPot /></label>
                            <input type='checkbox' name='Barbecue' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                        <li>
                            <label>Limpieza incluida <GiVacuumCleaner /></label>
                            <input type='checkbox' name='Cleaning' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                        <li>
                            <label>Estacionamiento techado <FaCarAlt /></label>
                            <input type='checkbox' name='Parking' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                    </ul>
                </li>
                <li>
                    <hr />
                    <label className={styles.serviceTitle}><MdRoomService /> Servicios adicionales: </label>
                    <ul className={styles.serviceCont}>
                        <li>
                            <label>Consola de videojuegos <FaGamepad /></label>
                            <input type='checkbox' name='Videogames' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                        <li>
                            <label>Alquiler de auto <FaCarAlt /></label>
                            <input type='checkbox' name='RentCar' onChange={e => handleCheck(e)} className={styles.service} />
                        </li>
                    </ul>
                </li>
                <li>
                    <button type='submit' className={styles.reload} id={styles.search}><span><ImSearch /></span></button>
                </li>
            </ul >


            <div className={styles.cabinCont}>
                <div className={styles.paginado1}>
                    <Paginado cabinsPerPage={cabinsPerPage} allCabins={allCabins.length} paginado={paginado} />
                </div>
                {
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
                }
                <div className={styles.paginado2}>
                    <Paginado cabinsPerPage={cabinsPerPage} allCabins={allCabins.length} paginado={paginado} />
                </div>
            </div>

        </div >
    )
}
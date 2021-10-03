import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCabins, filterCabins } from "../../actions";
import Paginado from './Paginado/Paginado';
import Navbar from "../Navbar/Navbar";
import Cabaña from "./Cabaña/Cabaña";
import styles from "./Reserva.module.css";
import { FaWifi, FaCarAlt } from 'react-icons/fa';
import { GiVacuumCleaner, GiCampCookingPot } from 'react-icons/gi';
import { IoMdPeople } from 'react-icons/io';
import { MdAttachMoney, MdRoomService } from 'react-icons/md';
import { ImCalendar, ImSearch } from 'react-icons/im';
import { AiOutlineReload } from 'react-icons/ai';
import { Logeduser } from "../../actions";
import RangeSlider from "./Slider/Slider";
import Slider from "./Slider/Slider";


export default function Reserva() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser())
    }, [dispatch]);
    const allCabins = useSelector(state => state.cabins);


    // Paginado---------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [cabinsPerPage, /*setCabinsPerPage*/] = useState(6);
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
        setFilters({
            inDate: '',
            outDate: '',
            capacity: '',
            priceRange: '',
            wifi: '',
            barbecue: '',
            cleaning: '',
            parking: '',
        })
        window.location.reload();
    }

    const [filters, setFilters] = useState({
        inDate: '',
        outDate: '',
        capacity: '',
        priceRange: '',
        wifi: '',
        barbecue: '',
        cleaning: '',
        parking: '',
    });
    function handleCheck(e) {
        let evt = filters[e.target.name];
        e.target.value = evt === 'true' ? false : true;
    }
    function handleChange(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        console.log(filters);
    }

    function handleFilters(e) {
        e.preventDefault();
        console.log('Filters submited');
        dispatch(filterCabins(filters));
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
                        name='inDate'
                        onChange={e => handleChange(e)}
                    />
                </li>
                <li>
                    <label><ImCalendar /> Fecha de salida: </label>
                    <input
                        type="date"
                        className={styles.fechas}
                        name='outDate'
                        onChange={e => handleChange(e)}
                    />
                </li>
                <li>
                    <label><IoMdPeople /> Cantidad de personas </label>
                    <select onChange={e => handleChange(e)} name='capacity'>
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
                    {/* <Slider/> */}
                </li>
                <li>
                    <hr />
                    <label className={styles.serviceTitle}><MdRoomService /> Que cuente con:</label>
                    <ul className={styles.serviceCont}>
                        <li>
                            <label>Wifi <FaWifi /></label>
                            <input
                                type='checkbox'
                                name='wifi'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                                className={styles.service}
                            />
                        </li>
                        <li>
                            <label>Parrilla <GiCampCookingPot /></label>
                            <input
                                type='checkbox'
                                name='barbecue'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                                className={styles.service}
                            />
                        </li>
                        <li>
                            <label>Limpieza incluida <GiVacuumCleaner /></label>
                            <input
                                type='checkbox'
                                name='cleaning'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                                className={styles.service}
                            />
                        </li>
                        <li>
                            <label>Estacionamiento techado <FaCarAlt /></label>
                            <input
                                type='checkbox'
                                name='parking'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                                className={styles.service}
                            />
                        </li>
                    </ul>
                </li>
                <hr/>
                <li>
                    <button
                        className={styles.reload}
                        id={styles.search}
                        onClick={(e) => handleFilters(e)}
                    ><span><ImSearch /> Iniciar búsqueda</span></button>
                </li>
            </ul >


            <div className={styles.cabinPage}>
                <div className={styles.cabinCont}>
                    {
                        currentCabins?.map(el => {
                            return (
                                <div key={el.number} >
                                    <Cabaña
                                        number={el.Number}
                                        capacity={el.Capacity}
                                        notAvailable={el.NotAvailable}
                                        price={el.Price}
                                        description={el.Description}
                                        image={el.Image}
                                        coffe={el.Coffe}
                                        microwaves={el.Microwaves}
                                        heat={el.Heat}
                                        barbecue={el.Barbecue}
                                        wifi={el.Wifi}
                                        cleaning={el.Cleaning}
                                        refrigerator={el.Refrigerator}
                                        stove={el.Stove}
                                        parking={el.Parking}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.paginado}>
                    <Paginado cabinsPerPage={cabinsPerPage} allCabins={allCabins.length} paginado={paginado} />
                </div>
            </div>

        </div >
    )
}
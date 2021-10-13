import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCabins, filterCabins,readWeather } from "../../actions";
import Paginado from './Paginado/Paginado';
import Navbar from "../Navbar/Navbar";
import Cabaña from "./Cabaña/Cabaña";
import styles from "./Reserva.module.css";
import { FaWifi, FaCarAlt } from 'react-icons/fa';
import { GiCampCookingPot } from 'react-icons/gi';
import { IoMdPeople } from 'react-icons/io';
import { MdAttachMoney, MdRoomService } from 'react-icons/md';
import { ImCalendar, ImSearch } from 'react-icons/im';
import { AiOutlineReload } from 'react-icons/ai';
import { Logeduser } from "../../actions";

function validate(filters) {
    let errors = {};

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    var inDate = filters.inDate.split('-').reverse().join('/');
    var outDate = filters.outDate.split('-').reverse().join('/');
    console.log('inDate', inDate, 'today', today, inDate > today);
    console.log('outDate', outDate, 'today', today, outDate > today);

    if((inDate < today && inDate !== '') || (outDate < today && outDate !== '')){
        errors.today = 'Fechas inválidas';
    }
    if (inDate > outDate && outDate !== '') {
        errors.inDate = 'La fecha de llegada debe ser anterior a la de salida';
    }
    if (parseInt(filters.priceMin) > parseInt(filters.priceMax) && filters.priceMin !== 'all' && filters.priceMax !== 'all') {
        errors.priceMin = 'El precio mínimo debe ser menor que el máximo';
    }

    return errors;
}


export default function Reserva() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser())
    }, [dispatch]);

    useEffect(()=>{
        dispatch (readWeather());
    });

    const allCabins = useSelector(state => state.cabins);
    const [errors, setErrors] = useState({})

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


    const [filters, setFilters] = useState({
        inDate: '',
        outDate: '',
        capacity: '',
        priceMin: '',
        priceMax: '',
        wifi: '',
        barbecue: '',
        parking: '',
    });

    function handleReload(e) {
        e.preventDefault();
        setFilters({
            inDate: '',
            outDate: '',
            capacity: '',
            priceMin: '',
            priceMax: '',
            wifi: '',
            barbecue: '',
            parking: '',
        })
        window.location.reload();
    }

    function handleCheck(e) {
        let evt = filters[e.target.name];
        e.target.value = evt === 'true' ? false : true;
    }
    function handleChange(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...filters,
            [e.target.name]: e.target.value
        }))
        console.log('filters',filters);
        console.log('errors',errors);
    }


    function handleFilters(e) {
        e.preventDefault();
        console.log('errors:',errors);
        if (!Object.getOwnPropertyNames(errors).length) {
            console.log('Filters submited');
            dispatch(filterCabins(filters));
        }
        else {
            if(errors.today) alert(errors.today);
            if (errors.inDate && !errors.today) alert(errors.inDate);
            if (errors.priceMin) alert(errors.priceMin);
        }
    }

    return (
        <div>
            <Navbar className={styles.navbar} />
            <ul className={styles.reserva}>
                <li>
                    <button className={styles.reload} onClick={e => handleReload(e)}>Limpiar filtros <p><AiOutlineReload /></p></button>
                </li>
                <hr />
                <li>
                    <label><p><ImCalendar /></p> Fecha de llegada: </label>
                    <input
                        type="date"
                        className={styles.fechas}
                        name='inDate'
                        onChange={e => handleChange(e)}
                    />
                </li>
                <li>
                    <label><p><ImCalendar /></p> Fecha de salida: </label>
                    <input
                        type="date"
                        className={styles.fechas}
                        name='outDate'
                        onChange={e => handleChange(e)}
                    />
                </li>
                <li>
                    <label><p><IoMdPeople /></p> Cantidad de personas </label>
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
                    <label><p><MdAttachMoney /></p> Rango de precios por noche: </label>
                    <div id={styles.priceRange}>
                        <select onChange={e => handleChange(e)} name='priceMin' className={styles.prices}>
                            <option value='selected' hidden>Mínimo</option>
                            <option value='all'>Sin mínimo</option>
                            <option value='1500'>$1500</option>
                            <option value='3000'>$3000</option>
                            <option value='4500'>$4500</option>
                            <option value='6000'>$6000</option>
                            <option value='7500'>$7500</option>
                        </select>
                        <select onChange={e => handleChange(e)} name='priceMax' className={styles.prices}>
                            <option value='selected' hidden>Máximo</option>
                            <option value='all'>Sin máximo</option>
                            <option value='3000'>$3000</option>
                            <option value='4500'>$4500</option>
                            <option value='6000'>$6000</option>
                            <option value='7500'>$7500</option>
                            <option value='9000'>$9000</option>
                        </select>
                    </div>
                </li>
                <li>
                    <hr />
                    <label className={styles.serviceTitle}><p><MdRoomService /></p> Que cuente con:</label>
                    <ul className={styles.serviceCont}>
                        <li>
                            <label>Wifi <p className={styles.services}><FaWifi /></p></label>
                            <input
                                type='checkbox'
                                name='wifi'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                            />
                        </li>
                        <li>
                            <label>Parrilla <p className={styles.services}><GiCampCookingPot /></p></label>
                            <input
                                type='checkbox'
                                name='barbecue'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                            />
                        </li>
                        <li>
                            <label>Estacionamiento techado <p className={styles.services}><FaCarAlt /></p></label>
                            <input
                                type='checkbox'
                                name='parking'
                                onChange={e => {
                                    handleCheck(e);
                                    return handleChange(e);
                                }}
                            />
                        </li>
                    </ul>
                </li>
                <hr />
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
                                        ID={el.ID}
                                        number={el.Number}
                                        capacity={el.Capacity}
                                        Available={el.Available}
                                        price={el.Price}
                                        description={el.Description}
                                        Picture={el.Picture}
                                        parrilla={el.Parrilla}
                                        wifi={el.Wifi}
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
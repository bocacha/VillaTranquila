import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCabins, filterCabins } from "../../actions";
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
// import Slider from "./Slider/Slider.jsx";


export default function Reserva() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser())
    }, [dispatch]);
    const allCabins = useSelector(state => state.cabins);

    // Slider-----------------------------------------------------------------
    const slideValue = document.getElementById("span");
    const inputSlider = document.getElementById("input");
    const oninput = (() => {
        let value = inputSlider.defaultValue;
        slideValue.textContent = value;
        slideValue.style.left = (value / 2) + "%";
        slideValue.classList.add("show");
    });
    const onblur = (() => {
        slideValue.classList.remove("show");
    });
    //------------------------------------------------------------------------


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
            price: '5000',
            // priceMin: '',
            // priceMax: '',
            wifi: '',
            barbecue: '',
            parking: '',
        })
        window.location.reload();
    }

    const [filters, setFilters] = useState({
        inDate: '',
        outDate: '',
        capacity: '',
        price: '5000',
        // priceMin: '',
        // priceMax: '',
        wifi: '',
        barbecue: '',
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
                    {/*SLIDER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

                    <div className={styles.range}>
                        <div class={styles.sliderValue}>
                            <span id={styles.span}>5000</span>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.value}>
                                <div id={styles.left}>
                                    1500
                                </div>
                            </div>
                            <input
                                id={styles.input}
                                type="range"
                                min="1500"
                                max="8500"
                                defaultValue='5000'
                                steps="1"
                                onInput={oninput}
                                onBlur={onblur}
                                onChange={e => handleChange(e)}
                            />
                            <div className={styles.value}>
                                <div id={styles.right}>
                                    8500
                                </div>
                            </div>
                        </div>
                        <script src="slider.js"></script>

                    </div>

                    {/* <RangeSlider /> */}
                    {/* <Slider /> */}
                    {/* <select onChange={e => handleChange(e)} name='priceRange'>
                        <option value='selected' hidden>$</option>
                        <option value='all'>No tengo precio definido</option>
                        <option value='1500 - 3000' >1500 - 3000</option>
                        <option value='3001 - 4500'>3001 - 4500</option>
                        <option value='4501 - 6000'>4501 - 6000</option>
                        <option value='6001 - 7500'>6001 - 7500</option>
                        <option value='7501 - 9000'>7501 - 9000</option>
                    </select> */}
                    {/* <div id={styles.priceRange}>
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
                    </div> */}
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
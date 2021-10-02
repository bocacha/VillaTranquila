import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCabins, filterCabinsByCapacity, filterCabinsByPrice, } from "../../actions";
import Paginado from './Paginado/Paginado';
import Navbar from "../Navbar/Navbar";
import Cabaña from "./Cabaña/Cabaña";
import styles from "./Reserva.module.css";
import { FaWifi, FaCarAlt } from 'react-icons/fa';
import { GiVacuumCleaner, GiCampCookingPot } from 'react-icons/gi';
import { IoMdPeople } from 'react-icons/io';
import { MdAttachMoney } from 'react-icons/md';
import { ImCalendar } from 'react-icons/im';
import { BiTime } from 'react-icons/bi';
import { AiOutlineReload } from 'react-icons/ai';
import { Logeduser } from "../../actions";

export default function Reserva() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Logeduser())
    }, [dispatch]);
    // const allCabins = useSelector(state => state.cabins);

    // // Paginado---------------------------------------------------------------
    // const [currentPage, setCurrentPage] = useState(1);
    // const [cabinsPerPage, setCabinsPerPage] = useState(9);
    // const indexOfLastCabin = currentPage * cabinsPerPage;
    // const indexOfFirstCabin = indexOfLastCabin - cabinsPerPage;
    // const currentCabins = allCabins.slice(indexOfFirstCabin, indexOfLastCabin);

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }
    // //-------------------------------------------------------------------------

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
    // function handleCheck(e){
    //     let name = e.target.name;
    //     if(status.includes(name)){
    //         status = status.filter(el => el !== name);
    //     }
    //     else{
    //         status.push(name);
    //     }
    //     console.log(name, status);
    //     dispatch(filterCabinsByServices(status));
    // }

    return (
        <div>
            <Navbar className={styles.navbar} />
            <ul className={styles.reserva}>
                <li>
                    <button className={styles.reload} onClick={e => handleReload(e)}>Recargar todas las cabañas <AiOutlineReload/></button>
                </li>
                <hr />
                <li>
                    <label><ImCalendar/> Fecha y hora estimada de check in: <BiTime/></label>
                    <input
                        type="datetime-local"
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label><ImCalendar/> Fecha y hora estimada de check out: <BiTime/></label>
                    <input
                        type="datetime-local"
                        className={styles.fechas}
                    />
                </li>
                <li>
                    <label><IoMdPeople/> Cantidad de personas <IoMdPeople/></label>
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
                    <label><MdAttachMoney/> Precio por noche en pesos <MdAttachMoney/> </label>
                    <select onChange={e => handleFilterPrice(e)} >
                        <option value='selected' hidden>Precio por noche</option>
                        <option value='all'>No tengo un precio definido</option>
                        <option value='1500'>$1500</option>
                        <option value='2500'>$2500</option>
                        <option value='3500'>$3500</option>
                        <option value='4500'>$4500</option>
                    </select>
                </li>
                <li>
                    <hr/>
                    <label>Que cuente con:</label>
                    <ul className={styles.serviceCont}>
                        <li>
                            <label>Wifi <FaWifi/></label>
                            {/* <input type='checkbox' name='Wifi' onChange={e => handleCheck(e)} className={styles.service} /> */}
                        </li>
                        <li>
                            <label>Parrilla <GiCampCookingPot/></label>
                            {/* <input type='checkbox' name='Barbecue' onChange={e => handleCheck(e)} className={styles.service} /> */}
                        </li>
                        <li>
                            <label>Limpieza incluida <GiVacuumCleaner/></label>
                            {/* <input type='checkbox' name='Cleaning' onChange={e => handleCheck(e)} className={styles.service} /> */}
                        </li>
                        <li>
                            <label>Estacionamiento techado <FaCarAlt/></label>
                            {/* <input type='checkbox' name='Parking' onChange={e => handleCheck(e)} className={styles.service} /> */}
                        </li>
                    </ul>
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
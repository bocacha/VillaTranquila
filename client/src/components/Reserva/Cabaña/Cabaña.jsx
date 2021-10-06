import React from "react";
import { useEffect, useState } from "react"
import styles from './Cabaña.module.css';
import { GiCoffeeCup, GiChickenOven, GiFireplace, GiCampCookingPot, GiVacuumCleaner, GiCookingPot } from 'react-icons/gi';
import { RiFridgeLine } from 'react-icons/ri';
import { FaWifi, FaCarAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Cabaña({
    ID,
    number,
    capacity,
    notAvailable,
    price,
    description,
    coffe,
    microwaves,
    heat,
    barbecue,
    wifi,
    cleaning,
    refrigerator,
    stove,
    parking,
    image
    }){
        const id = ID;
        const prices = price;
        const id_cabaña = () => {
            localStorage.setItem("id_cabaña", JSON.stringify(id));
            localStorage.setItem("costo", JSON.stringify(prices))
        }

    return (
        <div className={styles.cabaña}>
            <h1>Cabaña número {number}</h1>
            <img src={image} alt={`Cabaña número ${number}`} />
            <span> Capacidad: {capacity}</span>
            <span> Disponible a partir del: {notAvailable}</span>
            <span> Precio por noche: {price}</span>
            <span> Descripción: {description}</span>
            {/* <span> Servicios disponibles: 
                {coffe && <GiCoffeeCup/>}
                {microwaves && <GiChickenOven/>}
                {heat && <GiFireplace/>}
                {barbecue && <GiCampCookingPot/>}
                {wifi && <FaWifi/>}
                {cleaning && <GiVacuumCleaner/>}
                {stove && <GiCookingPot/>}
                {parking && <FaCarAlt/>}
                {refrigerator && <RiFridgeLine/>}
            </span> */}
            <Link to="/reserva/reservar">
                <button onClick={id_cabaña}>Reserva ya</button>
            </Link>
        </div>
    )
}
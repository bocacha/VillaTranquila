import React from "react";
import styles from './Cabaña.module.css';
import { GiCoffeeCup, GiChickenOven, GiFireplace, GiCampCookingPot, GiVacuumCleaner, GiCookingPot } from 'react-icons/gi';
import { RiFridgeLine } from 'react-icons/ri';
import { FaWifi, FaCarAlt } from 'react-icons/fa';

export default function Cabaña({
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
    return (
        <div className={styles.cabaña}>
            <h1>Cabaña número {number}</h1>
            <img src={image} alt={`Cabaña número ${number}`} />
            <span>Capacidad: {capacity}</span>
            <span>Disponible a partir del: {notAvailable}</span>
            <span>Precio por noche: {price}</span>
            <span>{description}</span>
            <span> Servicios disponibles: 
                {coffe && <GiCoffeeCup/>}
                {microwaves && <GiChickenOven/>}
                {heat && <GiFireplace/>}
                {barbecue && <GiCampCookingPot/>}
                {wifi && <FaWifi/>}
                {cleaning && <GiVacuumCleaner/>}
                {stove && <GiCookingPot/>}
                {parking && <FaCarAlt/>}
                {refrigerator && <RiFridgeLine/>}
            </span>
            <button>Reserva ya</button>
        </div>
    )
}
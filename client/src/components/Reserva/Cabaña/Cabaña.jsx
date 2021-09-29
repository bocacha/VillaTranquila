import React from "react";
import styles from './Cabaña.module.css';

export default function Cabaña(number, capacity, available, price, description, img){
    return (
        <div>
            <h1>Cabaña número {number}</h1>
            <img src={img} alt={`Cabaña número ${number}`} />
            <span>Capacidad: {capacity}</span>
            <span>Disponible a partir del: {available}</span>
            <span>Precio por noche: {price}</span>
            <span>{description}</span>
        </div>
    )
}
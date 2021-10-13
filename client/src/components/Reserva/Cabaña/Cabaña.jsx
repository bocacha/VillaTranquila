import React from "react";
import { useEffect, useState } from "react";
import styles from "./Cabaña.module.css";
import { GiBarbecue } from "react-icons/gi";
import { FaWifi, FaCarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectcabin } from "../../../actions";

export default function Cabaña({
  ID,
  number,
  capacity,
  Available,
  price,
  description,
  Picture,
  parrilla,
  wifi,
  parking,
  image,
}) {
  const dispatch = useDispatch();
  const id = ID;
  const prices = price;
  const id_cabaña = () => {
    localStorage.setItem("id_cabaña", JSON.stringify(id));
    localStorage.setItem("costo", JSON.stringify(prices));
    dispatch(selectcabin(id))
  };

  return (
    <div className={styles.cabaña}>
      <h1 className={styles.title}>Cabaña número {number}</h1>
      {/* <img src={image} alt={`Cabaña número ${number}`} /> */}
      <div className={styles.infoContainer}>
        <img
          src={Picture}
          alt={`Cabaña número ${number}`}
          className={styles.img}
        />
        <div className={styles.info}>
          <span>Capacidad: {capacity} personas</span>
          {Available.length !== 0 &&
            <div>Fechas ocupadas: {Available.map((e) => {
              return (
                <ul>
                  <li>Del {e[0]} Al {e[e.length - 1]}</li>
                </ul>)

            })}</div>
          }
          <span>Precio por noche: $ {price}</span>
          <span> Descripción: {description}</span>
          <div className={styles.servicios}>
            {parrilla && <p><GiBarbecue /></p>}
            {wifi && <p><FaWifi /></p>}
            {parking && <p><FaCarAlt /></p>}
          </div>
        </div>
        <div className={styles.containerBtn}>
          <Link to="/reserva/reservar">
            <button onClick={id_cabaña} className={styles.btn}>
              ¡Reserva ya!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

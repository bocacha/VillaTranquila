import React from "react";
import styles from "./Cabañas.module.css";

export default function FotosDetail({ 
    Number,
    Capacity,
    Available,
    Price,
    Description,
    Coffe,
    Microondas,
    Calefaccion,
    Barbecue,
    Wifi,
    Cleaning,
    Refrigerator,
    Stove,
    Parking

}) {
  return (
    <div className={styles.container}>
      <p>Number: {Number}</p>
      <p>Capacity: {Capacity}</p>
      <p>Available: {Available}</p>
      <p>Price: {Price}</p>
      <p>Descripcion: {Description}</p>
      <p>Coffe: {Coffe?<span>si</span>:<span>no</span>}</p>
      <p>Microondas: {Microondas?<span>si</span>:<span>no</span>}</p>
      <p>Calefaccion: {Calefaccion?<span>si</span>:<span>no</span>}</p>
      <p>Barbecue: {Barbecue?<span>si</span>:<span>no</span>}</p>
      <p>Wifi: {Wifi?<span>si</span>:<span>no</span>}</p>
      <p>Cleaning: {Cleaning?<span>si</span>:<span>no</span>}</p>
      <p>Refrigerator: {Refrigerator?<span>si</span>:<span>no</span>}</p>
      <p>Stove: {Stove?<span>si</span>:<span>no</span>}</p>
      <p>Parking: {Parking?<span>si</span>:<span>no</span>}</p>
    </div>
  );
}

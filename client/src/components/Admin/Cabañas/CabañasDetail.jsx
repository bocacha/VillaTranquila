import React from "react";
import styles from "./CabañasDetail.module.css";

export default function CabinsDetail({ 
    ID,
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
      <p><strong>Id:</strong>  {ID} </p>
      <p><strong> Number:</strong> {Number}</p>
      <p><strong>Capacity:</strong>  {Capacity}</p>
      <p><strong>Available:</strong>  {Available}</p>
      <p><strong>Price:</strong>  {Price}</p>
      <p><strong>Descripcion:</strong>  {Description}</p>
      <p><strong>Coffe:</strong>  {Coffe?<span>si</span>:<span>no</span>}</p>
      <p><strong>Microondas:</strong>  {Microondas?<span>si</span>:<span>no</span>}</p>
      <p><strong>Calefaccion:</strong>  {Calefaccion?<span>si</span>:<span>no</span>}</p>
      <p><strong>Barbecue:</strong>  {Barbecue?<span>si</span>:<span>no</span>}</p>
      <p><strong> Wifi:</strong> {Wifi?<span>si</span>:<span>no</span>}</p>
      <p><strong>Cleaning: </strong> {Cleaning?<span>si</span>:<span>no</span>}</p>
      <p><strong>Refrigerator:</strong>  {Refrigerator?<span>si</span>:<span>no</span>}</p>
      <p><strong>Stove:</strong>  {Stove?<span>si</span>:<span>no</span>}</p>
      <p><strong>Parking:</strong>  {Parking?<span>si</span>:<span>no</span>}</p>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

export default function Admin() {
  return (
  <div className={styles.container}>
        <button><Link to='admin/cabañas'>Cabañas</Link></button>      
        <button><Link to="admin/reservaciones">Reservaciones</Link></button>
        <button><Link to="admin/servicios">Servicios</Link></button>
        <button><Link to="admin/pagos">Pagos</Link></button>
        <button><Link to="admin/fotos">Fotos</Link></button>
        <button><Link to="admin/usuarios">Usuarios</Link></button>
  </div>
  );
}

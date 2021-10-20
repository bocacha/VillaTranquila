import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavAdmin.module.css";

export default function NavAdmin() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/admin" className={styles.link}>
              Menú
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/cabañas" className={styles.link}>
              Cabañas
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/reservaciones" className={styles.link}>
              Reservaciones
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/servicios" className={styles.link}>
              Servicios
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/pagos" className={styles.link}>
              Pagos
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/fotos" className={styles.link}>
              Fotos
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/usuarios" className={styles.link}>
              Usuarios
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/admin/caja" className={styles.link}>
              Caja
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

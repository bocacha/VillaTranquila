import React from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import Navbar from "../Navbar/Navbar";
import{useEffect} from "react"
import { useDispatch} from 'react-redux';
import { Logeduser } from "../../actions";

export default function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser())
}, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.bienvenida}>
          <span className={styles.title}>¡Bienvenido, Administrador!</span> <br />
          <span className={styles.info}> Seleccione que desea ver, crear, editar o eliminar </span>
        </div>
        <div className={styles.cards}>
          <button className={styles.cardsContainer}>
            <div>
              <Link to="admin/cabañas">
                <img
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f0/fd/2d/cottage-complex-velt.jpg?w=1200&h=-1&s=1"
                  alt="cabañas"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/cabañas" className={styles.link}>Cabañas</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="admin/reservaciones">
                <img
                  src="https://food.fnr.sndimg.com/content/dam/images/food/unsized/2014/6/23/0/fnd_Reserved-Sign-Thinkstock_s4x3.jpg"
                  alt="reservas"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/reservaciones" className={styles.link}>Reservaciones</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="admin/servicios">
                <img
                  src="https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/nuestrorumbo/q/que-servicios-debe-tener-un-hotel-para-ser-tres-estrellas-1.jpg"
                  alt="servicios"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/servicios" className={styles.link}>Servicios</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="admin/pagos">
                <img
                  src="https://intl-blog.imgix.net/wp-content/uploads/2020/08/Pagos-por-movil-header.png?auto=format%2Cenhance"
                  alt="pagos"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/pagos" className={styles.link}>Pagos</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="admin/fotos">
                <img
                  src="https://i.pinimg.com/736x/d6/5a/ce/d65acea83899fa0352ab4d29fd6997a4.jpg"
                  alt="fotos"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/fotos" className={styles.link}>Fotos</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="admin/usuarios">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                  alt="usuarios"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="admin/usuarios" className={styles.link}>Usuarios</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

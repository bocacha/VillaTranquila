import React from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import Navbar from "../Navbar/Navbar";
import{useEffect} from "react"
import { useDispatch} from 'react-redux';
import { Logeduser } from "../../actions";
import NavAdmin from "./NavAdmin/NavAdmin";

export default function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser())
}, [dispatch]);
  return (
    <div>
      <div className={styles.navs2}>
        <div className={styles.navs}>
          <Navbar />
          <NavAdmin  className={styles.navAdmin}/>
        </div>
        <div className={styles.navRsp}>
          <Navbar />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.bienvenida}>
          <span className={styles.title}>¡Bienvenido, Administrador!</span> <br />
          <span className={styles.info}> Seleccione que desea ver, crear, editar o eliminar </span>
        </div>
        <div className={styles.cards}>
          <button className={styles.cardsContainer}>
            <div>
              <Link to="/admin/cabañas">
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/03/10/24/cabin-310330_960_720.png"
                  // src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f0/fd/2d/cottage-complex-velt.jpg?w=1200&h=-1&s=1"
                  alt="cabañas"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/cabañas" className={styles.link}>Cabañas</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/reservaciones">
                <img
                  src="https://image.flaticon.com/icons/png/512/489/489848.png"
                  // src="https://food.fnr.sndimg.com/content/dam/images/food/unsized/2014/6/23/0/fnd_Reserved-Sign-Thinkstock_s4x3.jpg"
                  alt="reservas"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/reservaciones" className={styles.link}>Reservaciones</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/servicios">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2197/2197260.png"
                  // src="https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/nuestrorumbo/q/que-servicios-debe-tener-un-hotel-para-ser-tres-estrellas-1.jpg"
                  alt="servicios"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/servicios" className={styles.link}>Servicios</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/pagos">
                <img
                  src="https://mcrmoviles.com/wp-content/uploads/2020/08/inversion.png"
                  alt="pagos"
                  className={styles.img}
                  style={{marginTop:"5px"}}
                />
              </Link>
            </div>
            <Link to="/admin/pagos" className={styles.link}>Pagos</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/fotos">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1132/1132111.png"
                  alt="fotos"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/fotos" className={styles.link}>Fotos</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/usuarios">
                <img
                  src="https://image.flaticon.com/icons/png/512/17/17115.png"
                  alt="usuarios"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/usuarios" className={styles.link}>Usuarios</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/caja">
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/03/10/55/billing-machine-311746_960_720.png"
                  alt="caja"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/Solicitudes" className={styles.link}>Caja</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/Solicitudes">
                <img
                  src="https://image.flaticon.com/icons/png/512/16/16498.png"
                  alt="reservas"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/Solicitudes" className={styles.link}>Solicitudes de Cambios</Link>
          </button>
          <button  className={styles.cardsContainer}>
            <div>
              <Link to="/admin/testimonial">
                <img
                  src="https://i.pinimg.com/originals/aa/4f/12/aa4f1285ec14de367860146ce6e15b4b.png"
                  alt="testimonial"
                  className={styles.img}
                />
              </Link>
            </div>
            <Link to="/admin/testimonial" className={styles.link}>Reseñas</Link>
          </button>
        </div>
        
      </div>
    </div>
  );
}

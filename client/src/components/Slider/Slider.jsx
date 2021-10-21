import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.slider}>
      <React.Fragment>
        <Carousel variant="dark" className={styles.container}>
          {/* Primer Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134887/Cabins/10_yv2teh.jpg"
              alt="Uno slide"
            />
            <Carousel.Caption>
              <Link className={styles.link} to="/reserva">
                <div className={styles.wrapper}>
                  <h3 className={styles.h3}>¡Reserve Ya!</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Segundo Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134844/Cabins/5_vxhhvy.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <Link className={styles.link} to="/contacto">
                <div className={styles.wrapper}>
                  <h3 className={styles.consulta}>Haga su consulta</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Tercer Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134933/Cabins/12_rctcjm.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
                <button onClick={(e) => {
                  window.scrollTo({
                    top: 1000000,
                    left: 0,
                    behavior: "smooth",
                  });
                }} class={styles.botonFondo}>
                  <div className={styles.wrapper}>
                    <h3 className={styles.newsletter}>
                      Suscríbase al Newsletter
                    </h3>
                  </div>
                </button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Cuarto Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134980/Bedrooms/24_exzdeb.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Link className={styles.link} to="/reserva">
                <div className={styles.wrapper}>
                  <h3 className={styles.chatea}>Chateá con nosotros</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Quinto Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134972/Bedrooms/22_liovpk.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Link className={styles.link} to="/galeria">
                <div className={styles.wrapper}>
                  <h3 className={styles.chatea}>Galería de imagenes</h3>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Sexto Slide */}
          <Carousel.Item>
            <img
              className={styles.img}
              src="https://res.cloudinary.com/villatranquila/image/upload/v1633134955/Lobby/15_kcxgry.jpg"
              alt="Third slide"
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    </div>
  );
}

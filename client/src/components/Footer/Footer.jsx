import React from "react";
import styles from "./Footer.module.css";
import { BiMailSend } from "react-icons/bi";
import { FaMapPin } from "react-icons/fa";

import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.container}>

      <div className={styles.arriba}>
        <div className={styles.contacto}>
          <span className={styles.title}> Contacto </span> <br />
          <BiMailSend />
          VillaTranquila@gmail.com <br />
          <FaMapPin /> Ubicacion
        </div>
        <div className={styles.links}>
          <span className={styles.title}> Links útiles </span> <br />
          <Link to="/nosotros" className={styles.link}>
            Nosotros
          </Link>{" "}
          <br />
          <Link to="/contacto" className={styles.link}>
            Contacto
          </Link>
        </div>
        <div className={styles.redes}>
          <span className={styles.title}> Redes sociales </span> <br />
          <Link
            to={{ pathname: "https://www.instagram.com/?hl=es" }}
            target="_blank"
          >
            <AiOutlineInstagram className={styles.redesIconos} />
          </Link>
          <Link to={{ pathname: "https://www.facebook.com/" }} target="_blank">
            <AiFillFacebook className={styles.redesIconos} />
          </Link>
          <Link to={{ pathname: "https://www.youtube.com/" }} target="_blank">
            <AiFillYoutube className={styles.redesIconos} />
          </Link>
        </div>
        <div className={styles.newsletter}>
          <form action="">
            <span className={styles.title}>
              {" "}
              ¡Suscríbete a nuestra NewsLetter!{" "}
            </span>{" "}
            <br />
            <div>
              <input
                type="text"
                placeholder="E-mail"
                className={styles.input}
              />
            </div>
            <div>
              <button type="submit" className={styles.btn}>
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.derechos}>
        <div className={styles.a}>2021 - Todos los derechos reservados</div>

      </div>
    </div>
  );
}
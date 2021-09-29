import React from "react";
import styles from "./Footer.module.css";
import { BiMailSend } from "react-icons/bi";
import { FaMapPin } from "react-icons/fa";
import { AiOutlineInstagram, AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>
        Contacto <br />
        <BiMailSend />VillaTranquila@gmail.com <br />
        <FaMapPin /> Ubicacion
      </div>
      <div>
          Links útiles <br />
          <Link to="/nosotros">Nosotros</Link> <br />
          <Link to="/contacto">Contacto</Link>
      </div>
      <div>
        Redes sociales <br />
        <Link to={{pathname: 'https://www.instagram.com/?hl=es'}} target='_blank'><AiOutlineInstagram /></Link>
        <Link to={{pathname: 'https://www.facebook.com/'}} target='_blank'><AiFillFacebook /></Link>
        <Link to={{pathname: 'https://www.youtube.com/'}} target='_blank'><AiFillYoutube /></Link>
      </div>
      <div>
          <form action="">
              <div>
                  Suscríbete a nuestra NewsLetter!
              </div>
              <div>
                  <input type="text" />
              </div>
              <div>
                  <button type="submit">Suscribirme</button>
              </div>
          </form>
      </div>
      <div>
          <p>2021 - Todos los derechos reservados</p>
      </div>
    </div>
  );
}

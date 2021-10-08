import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../actions";
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
  const dispatch = useDispatch();
  const [footer, setFooter] = useState({email:""});
  const [errorEmail, setErrorEmail] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (footer === "") {
      setErrorEmail(true);
      return;
    }
    dispatch(sendEmail(footer));
    alert("Tu solicitud para la suscripción a la newsletter fue enviada, muchas gracias");
    setFooter("")
  };

  function handleChange(e) {
    setFooter({
      ...footer,
      [e.target.name]: e.target.value,
    });  
  }

  return (
    <div className={styles.container}>
      <div className={styles.arriba}>
        <div className={styles.contacto}>
          <span className={styles.title}> Contacto </span> <br />
          <BiMailSend />
          tranquilavilla79@gmail.com <br />
          <FaMapPin /> Ubicacion
        </div>
        <div className={styles.links}>
          <span className={styles.title}> Links útiles </span>  <br />
          <Link to="/nosotros" className={styles.link}>
            Nosotros
          </Link>{" "}
          <br />
          <Link to="/contacto" className={styles.link}>
            Contacto
          </Link>
          <br />
          <Link to="/reserva" className={styles.link}>
            Reservar
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
          {/* {errorEmail ? alert('Tiene que ingresar su correo') : null} */}
          <form action="" onSubmit={handleSubmit}>
            <span className={styles.title}>
              {" "}
              ¡Suscríbete a nuestra NewsLetter!{" "}
            </span>{" "}
            <br />
            <div>
              <input
               type="email"
               name="email"
               value={footer.email}
               placeholder='usuario@ejemplo.com'
               onChange={handleChange}
               className={styles.input}
               required
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

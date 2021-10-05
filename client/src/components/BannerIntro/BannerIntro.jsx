import React from "react";
import styles from "./BannerIntro.module.css";

export default function BannerIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.txt}>
        <p className={styles.p}>
        Nuestro complejo cuenta con diez cabañas totalmente equipadas, modernas y luminosas. Super amplias tanto como para parejas, amigos o familias hasta cinco integrantes. Para que no quede nadie afuera, tenemos el agrado de recibir a sus mascotas. Localizadas a escasos 5 minutos del centro de Villa la Angostura y próximas a los lagos Nahuel Huapi y Correntoso. Disponemos de un predio de 3500 m2 con parque y jardín de uso común, con variedad de flores de distintos colores y tamaños. Un estanque con una fuente que con su sonido, el canto de los pájaros y el silencio del barrio le brinda un cierre relajante a los días de actividad que nos regala este hermoso paraíso. Nuestras unidades tienen entradas independientes unas de otras de forma que podes disfrutar de las instalaciones sin tener contacto directo con otros huespedes.
        </p>
      </div>
    </div>
  );
}

import React from "react";
<<<<<<< Updated upstream
=======
import BannerIntro from "../BannerIntro/BannerIntro";
import Footer from "../Footer/Footer";
>>>>>>> Stashed changes
import Navbar from "../Navbar/Navbar";
import './Home.css';

<<<<<<< Updated upstream
export default function Home(){

    return (
        <div>
            <Navbar />
            <h1 className='HOME'>HOME</h1>
        </div>
    )
}
=======
export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>
      <div className={styles.nombre}>
        <div className={styles.nombre1}>
          Villa Tranquila
        </div>
      </div>
      <div>
        <BannerIntro />
        <Slider />
      </div>
      <div className={styles.mapaContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6043.886195637668!2d-71.64603887116112!3d-40.76327624112656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9610bf42e48faa93%3A0x205ebc786470b636!2sVilla%20La%20Angostura%2C%20Neuqu%C3%A9n!5e0!3m2!1ses-419!2sar!4v1632793447089!5m2!1ses-419!2sar"
          title="googleMaps"
          className={styles.mapa}
        ></iframe>
      </div>
        <Footer />
    </div>
  );
}
>>>>>>> Stashed changes

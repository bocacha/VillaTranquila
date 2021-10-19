import React from "react";
import BannerIntro from "../BannerIntro/BannerIntro";
import Chat from "./Chatbot/Chat";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import Weather from "../Weather/Weather";
import Upload from "../Reserva/Upload/Upload";
import Testimoniales from "../Testimoniales/Testomoniales";
import styles from "./Home.module.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Logeduser, getUserData, readWeather } from "../../actions";
import ServiciosBanner from "../ServiciosBanner/ServiciosBanner";


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Logeduser(), dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(readWeather());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  const ID = user && user.userid;
  useEffect(() => {
    dispatch(getUserData(ID))
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>
      <div className={styles.chat}>
        <Chat  />
      </div>
      <div className={styles.nombre}>
        <div className={styles.nombre1}>
          <p className={styles.villa}>Villa Tranquila </p>
          <p className={styles.complejo}>- complejo de cabañas -</p>
        </div>
      </div>
      <div>
        {/* <Searchbar/> */}
        {/* <Gallery/> */}
      </div>
      <div>
        <BannerIntro />
        {/* <Searchbar/> */}
        <Slider />
        <ServiciosBanner />
        <Weather />
      </div>
      <div className={styles.mapContainer}>
        <div className={styles.mapaContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6043.886195637668!2d-71.64603887116112!3d-40.76327624112656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9610bf42e48faa93%3A0x205ebc786470b636!2sVilla%20La%20Angostura%2C%20Neuqu%C3%A9n!5e0!3m2!1ses-419!2sar!4v1632793447089!5m2!1ses-419!2sar"
            title="googleMaps"
            className={styles.mapa}
          ></iframe>
        </div>
      </div>
      {/* <Testimoniales /> */}
        <Footer />

    </div>
  );
}

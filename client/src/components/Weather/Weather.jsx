import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from './Weather.module.css';

export default function Weather() {
    const weather = useSelector(state => state.weather);
    //console.log(weather)
    let today = '';
    let icono = [];
   
    return (
        <div className={styles.weather}>
            <p className={styles.titulo}>Clima actual</p>
            
            <div className={styles.container}>
                {weather?.map(e => {
                    if (weather.indexOf(e) === 0) today = 'Hoy';
                    if (weather.indexOf(e) === 1) today = 'Mañana';
                    if (weather.indexOf(e) === 2) today = 'Pasado mañana';
                    if (e.text === 'Patchy rain possible'){
                       icono  =  (<div className={styles.wcont}>
                       <div className={styles.icon, styles.rainy} id='rainy'>
                           <div className={styles.cloud}></div>
                           <div className={styles.rain}></div>
                       </div>
                   </div>)
                    } else if(e.text === 'Sunny'){
                       icono = ( 
                        <div className={styles.wcont}>
                            <div className={styles.icon, styles.sunny}>
                                    <div className={styles.sun}>
                                        <div className={styles.rays}></div>
                                    </div>
                                </div>
                        </div>)
                    }
                    

                    return (
                        <div className={styles.dia}>
                            <p className={styles.today}>{today}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles.izqu}>Temperatura mínima:</td>
                                        <td className={styles.der}>{e.min_temp} °C</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.izqu}>Temperatura máxima:</td>
                                        <td className={styles.der}>{e.max_temp} °C</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.izqu}>Vientos:</td>
                                        <td className={styles.der}>{e.wind} km/h</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.izqu}>Probabilidad de lluvias:</td>
                                        <td className={styles.der}>{e.chance_rain} %</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.izqu}>Probabilidad de nevadas:</td>
                                        <td className={styles.der}>{e.chance_snow} %</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <label>{e.text}</label> */}                       
                                {/* <img src={e.icon} />                           */}
                               {icono}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
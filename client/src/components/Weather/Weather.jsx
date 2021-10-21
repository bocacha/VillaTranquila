import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Weather.module.css";

export default function Weather() {
    const weather = useSelector(state => state.weather);
    //console.log(weather)
    let today = '';
    let icono = [];
   
    return (
        <div className={styles.weather}>
            <p className={styles.titulo}>Clima</p>
            
            <div className={styles.container}>
                {weather?.map(e => {
                    if (weather.indexOf(e) === 0) today = 'Hoy';
                    if (weather.indexOf(e) === 1) today = e.fecha.split('-').reverse().join('-');
                    if (weather.indexOf(e) === 2) today = e.fecha.split('-').reverse().join('-');
                    if (e.text === 'Patchy rain possible' || e.text === 'Patchy sleet possible'){
                        icono  = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.sun}>
                                        <div className={styles.rays}></div>
                                    </div>
                                    <div className={styles.rain}></div>
                                    </div>
                            </div>
                        )
                    } else if (e.text === 'Sunny' || e.text === 'Clear'){
                        icono = ( 
                            
                                <div className={styles.icon}>
                                    <div className={styles.sun}>
                                        <div className={styles.rays}></div>
                                    </div>
                                </div>
                           
                        )
                    } else if (e.text === 'Partly cloudy'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.sun}>
                                        <div className={styles.rays}></div>
                                    </div>
                                </div>
                                </div>
                        )
                    } else if (e.text === 'Cloudy' || e.text === 'Overcast'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.cloud}></div>
                                </div>
                                </div>
                        )
                    } else if (e.text === 'Patchy snow possible' || e.text === 'Patchy heavy snow' || e.text === 'Patchy light snow' || e.text === 'Light snow showers'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.sun}>
                                        <div className={styles.rays}></div>
                                    </div>
                                    <div className={styles.snow}>
                                        <div className={styles.flake}></div>
                                        <div className={styles.flake}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (e.text === 'Moderate snow' || e.text ===  'Moderate or heavy snow showers'  || e.text === 'Light snow'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.snow}>
                                        <div className={styles.flake}></div>
                                        <div className={styles.flake}></div>
                                    </div>
                                </div>
                                </div>
                        )
                    }else if (e.text === 'Rainy'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.rain}></div>
                                </div>
                                </div>
                        )
                    }else if (e.text === 'Storm'){
                        icono = ( 
                            <div className={styles.wcont}>
                                <div className={styles.icon}>
                                    <div className={styles.cloud}></div>
                                    <div className={styles.lightning}>
                                        <div className={styles.bolt}></div>
                                        <div className={styles.bolt}></div>
                                    </div>
                                </div>
                                </div>
                        )
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
                            <div className={styles.wcont}>
                          {icono}
                          </div>
                        </div>
                    )
                })}
                </div>
        </div>
    
  );
}

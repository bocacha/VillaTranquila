import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {readWeather} from  "../../actions"

export default function Weather(){
    const weather=useSelector(state => state.weather);
        //console.log(weather)
    return (
        <div>
        {weather?.map(e=>{
            return(
                <div>
                    <div>Temperatura Minima {e.min_temp}</div>
                    <div>Temperatura Maxima {e.max_temp}</div>
                    <img src={e.icon}/>
                </div>
            )
        })}
       </div>
    )
};
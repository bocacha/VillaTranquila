const { Router } = require('express');
require('dotenv').config();
const axios = require ('axios');

const router = Router();

const getAllApi = async() =>{  
    const api = await axios.get('http://api.weatherapi.com/v1/forecast.json?key=4d28c5ab99d84c38a6d153517211110%20&q=Villa%20la%20angostura&days=10&aqi=no&alerts=no');
   
    const apiInfo = api.data.forecast.forecastday.map(e=> {
        return {
            min_temp: e.day.mintemp_c,
            max_temp: e.day.maxtemp_c,
            wind: e.day.maxwind_kph,
            chance_rain: e.day.daily_chance_of_rain,
            chance_snow: e.day.daily_chance_of_snow,
            text:e.day.condition.text,
            icon: e.day.condition.icon
            }
    })
 
     return apiInfo;
}

router.get('/', async (req, res)=>{
    const WeatherTotal = await getAllApi();
    res.send(WeatherTotal);
}); 

module.exports = router;
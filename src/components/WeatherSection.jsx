'use client';

import { useState, useEffect } from 'react';

import {openWeatherUrl, openWeatherIconUrl} from '../constants/urls.jsx';
import {cities} from '../constants/city.jsx';

export default function WeatherSection() {

    const [data, setData] = useState([]);

    const OPEN_WEATHER_API = process.env.NEXT_PUBLIC_OPENWEATHER_API;
    
    useEffect(()=>{
      async function fetchData(){
        const weatherData = [];
        for(const city of cities){
            const response = await fetch(openWeatherUrl+`?q=${city}&appid=${OPEN_WEATHER_API}&cnt=1&units=metric`);
            const cityData = await response.json();
            //console.log(cityData)
            weatherData.push({
              name:city,
              temp:cityData.list[0].main.temp,
              humidity:cityData.list[0].main.humidity,
              condition:cityData.list[0].weather[0].main,
              icon:cityData.list[0].weather[0].icon
            });
            
        };
        setData((prev)=>weatherData);
        //console.log(weatherData);
      }
      fetchData();
    }, []);
    
    return (
        <div >
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((city, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{city.name}</h3>
              <p className="text-gray-600">{city.condition}</p>
            </div>
            <img src = {openWeatherIconUrl+city.icon+'@2x.png'} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temperature</span>
              <span className="text-primary-green font-semibold">{city.temp}°C</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Humidity</span>
              <span className="text-primary-green font-semibold">{city.humidity}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    );
}

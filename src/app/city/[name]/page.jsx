'use client';
import {useState, useEffect} from 'react';
import { useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WiDaySunny, WiRain } from 'react-icons/wi';

import {openWeatherUrl} from '../../../constants/urls.jsx';

export default function Page({params}) {
    const {name} = useParams(params);
    const [data, setData] = useState(null);
    
    const OPENWEATHER_API = process.env.NEXT_PUBLIC_OPENWEATHER_API;


    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(openWeatherUrl+`daily?q=${name}&units=metric&appid=${OPENWEATHER_API}`);
            const json = await response.json();
            setData((prev)=>json);
        }
        fetchData();
    },[]);

    const chartData = data?.list?.map((day, index) => ({
        day: `Day ${index + 1}`,
        max: (day.temp.max),
        min: (day.temp.min),
        dayTemp: (day.temp.day),
    }));

    if(!data){
        return (<h1 className="text-gray-800">Loading...</h1>);
    }

    return ( 
        <div className="bg-white rounded-xl p-6 space-y-6 shadow-lg">
            {/* Header Section */}
            <div className="flex items-center justify-between space-between">
                <h2 className="text-1.8xl font-semibold text-primary-green">
                    {data.city.name}
                </h2>
                <div className="text-gray-600 ">
                    <span className="text-primary-green text-1.3xl font-medium">
                        {(data.list[0].temp.day)}°C
                    </span>
                    <span className="mx-2">|</span>
                    <span className="capitalize text-1.3xl">{data.list[0].weather[0].description}</span>
                </div>
            </div>

            {/* Chart Section */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="day"
                            stroke="#4b5563"
                            tick={{ fill: '#6b7280' }}
                        />
                        <YAxis
                            stroke="#4b5563"
                            tick={{ fill: '#6b7280' }}
                            unit="°C"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="max"
                            stroke="#31513f"
                            strokeWidth={2}
                            dot={{ fill: '#31513f' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="dayTemp"
                            stroke="#86a293"
                            strokeWidth={2}
                            dot={{ fill: '#86a293' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="min"
                            stroke="#acc2b7"
                            strokeWidth={2}
                            dot={{ fill: '#acc2b7' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-700">Day</th>
                            <th className="px-4 py-3 text-left text-gray-700">Temperature</th>
                            <th className="px-4 py-3 text-left text-gray-700">Weather</th>
                            <th className="px-4 py-3 text-left text-gray-700">Humidity</th>
                            <th className="px-4 py-3 text-left text-gray-700">Pressure</th>
                            <th className="px-4 py-3 text-left text-gray-700">Wind</th>
                            <th className="px-4 py-3 text-left text-gray-700">Precip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.list.map((day, index) => (
                            <tr key={day.dt} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-800">Day {index + 1}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary-green">
                                            {(day.temp.max)}°C
                                        </span>
                                        <span className="text-gray-400">/</span>
                                        <span className="text-gray-600">
                                            {(day.temp.min)}°C
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {day.weather[0].main === 'Clear' ? (
                                            <WiDaySunny className="text-2xl text-orange-400" />
                                        ) : (
                                            <WiRain className="text-2xl text-primary-green" />
                                        )}
                                        <span className="text-gray-700 capitalize">
                                            {day.weather[0].description}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{day.humidity}%</td>
                                <td className="px-4 py-3 text-gray-700">{day.pressure}hPa</td>
                                <td className="px-4 py-3 text-gray-700">
                                    {day.speed}m/s {day.deg}°
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                    {Math.round(day.pop * 100)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
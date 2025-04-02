'use client';

import WeatherSection from '../../components/WeatherSection.jsx';
import CryptoSection from '../../components/CryptoSection.jsx';
import NewsSection from '../../components/NewsSection.jsx';
import {cities} from '../../constants/city.jsx';

export default function Dashboard() {
    return (
        <div>
        <div className={'grid'}>
            <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary-green mb-8">
            WeatherSection
            </h2>
            </div>
        </div>
        <WeatherSection cities={cities}/>
        <div className={'mt-10'}>
        <div className={'grid'}>
            <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary-green mb-8">
            CryptoSection
            </h2>
            </div>
        </div></div>
        <CryptoSection />
        <div className={'mt-10'}>
        <div className={'grid'}>
            <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary-green mb-8">
            NewsSection
            </h2>
            </div>
        </div></div>
        <NewsSection />
        </div>
    );
}
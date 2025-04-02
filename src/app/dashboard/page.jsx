'use client';
import WeatherSection from '../../components/WeatherSection.jsx';
import CryptoSection from '../../components/CryptoSection.jsx';
import NewsSection from '../../components/NewsSection.jsx';
function Dashboard() {
    return (
        <div className={'grid gap-y-10'}>
    <WeatherSection />
    <CryptoSection />
    <NewsSection />
    </div>
    );
}
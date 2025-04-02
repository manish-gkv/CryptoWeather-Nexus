import {topCitiesIndia} from '../../constants/city.jsx';
import WeatherSection from '../../components/WeatherSection.jsx';

export default function cityList(){
	return(<>
		<div className={'grid'}>
            <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary-green mb-8">
            Top Cities Weather
            </h2>
            </div>
        </div>
        <WeatherSection cities={topCitiesIndia}/>
	</>);
}
import WeatherPicture from './WeatherPicture';
import WeatherTemperature from './WeatherTemperature';
import WeatherHumidity from './WeatherHumidity';
import WeatherWind from './WeatherWind';
import WeatherMinMaxTemp from './WeatherMinMaxTemp';
import {useRecoilValue} from 'recoil';
import { recoilWeather } from '../state/atoms';

type fetchedWeatherType = {
    [key: string]: string | number | {
        [key: string]: string | number[];
    };
};

function DailyWeather() {
    const fetchedWeather:fetchedWeatherType = useRecoilValue(recoilWeather),
        today = new Date(),
        hourActually = today.getHours();

    return(
        <section>
            {fetchedWeather['hourly'] instanceof Object && (
                <ul>
                    <li>
                        <WeatherTemperature temperatureData={fetchedWeather} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <WeatherHumidity humidityData={fetchedWeather} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <WeatherWind windData={fetchedWeather} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <WeatherMinMaxTemp minMaxTempData={fetchedWeather} iteration={0} />
                    </li>
                    <li>
                        <WeatherPicture sunset={fetchedWeather['daily'] instanceof Object && fetchedWeather['daily']['sunset']['0']} datasArray={fetchedWeather['hourly']} iteration={hourActually} />
                    </li>
                </ul>
            )}
        </section>
    );
}

export default DailyWeather;
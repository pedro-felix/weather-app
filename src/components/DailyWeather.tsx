import WeatherPicture from './WeatherPicture';
import UniqueWeatherData from './UniqueWeatherData';
import WeatherMinMaxTemp from './WeatherMinMaxTemp';
import {useRecoilValue} from 'recoil';
import { recoilWeather } from '../state/atoms';
import { temperatureDatas, humidityDatas, windDatas, precipitationDatas } from '../json/uniqueWeatherDatas';

type fetchedWeatherType = {
    [key: string]: string | number | {
        [key: string]: string | number[];
    };
} | null;

function DailyWeather() {
    const fetchedWeather:fetchedWeatherType = useRecoilValue(recoilWeather),
        today = new Date(),
        hourActually = today.getHours();

    return (
        fetchedWeather !== null && fetchedWeather['hourly'] instanceof Object ? (
            <section className='m-5 flex w-full md:max-w-3xl border-2 border-black shadow-sm shadow-black rounded transition dark:shadow-lg dark:shadow-white dark:border-white'>
                <ul className='flex flex-col flex-wrap justify-center w-2/5 gap-1 items-center'>
                    <li>
                        <UniqueWeatherData className='text-5xl md:text-6xl' weatherData={fetchedWeather} uniqueData={temperatureDatas} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <UniqueWeatherData className='text-2xl md:text-3xl' weatherData={fetchedWeather} uniqueData={humidityDatas} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <UniqueWeatherData className='text-2xl md:text-3xl' weatherData={fetchedWeather} uniqueData={windDatas} iteration={hourActually} day={0} />
                    </li>
                    <li>
                        <WeatherMinMaxTemp className='text-2xl md:text-3xl' minMaxTempData={fetchedWeather} iteration={0} />
                    </li>
                    <li>
                        <UniqueWeatherData className='text-2xl md:text-3xl' weatherData={fetchedWeather} uniqueData={precipitationDatas} iteration={hourActually} day={0} />
                    </li>
                </ul>
                <div className='w-3/5'>
                    <WeatherPicture sunsetRise={fetchedWeather['daily'] instanceof Object && [fetchedWeather['daily']['sunrise']['0'], fetchedWeather['daily']['sunset']['0']]} datasArray={fetchedWeather['hourly']} iteration={hourActually} />
                </div>
            </section>
        ) : (
            null
        )
    );
}

export default DailyWeather;
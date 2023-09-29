import WeatherPicture from './WeatherPicture';
import UniqueWeatherData from './UniqueWeatherData';
import {useRecoilValue} from 'recoil';
import { recoilWeather } from '../state/atoms';
import { temperatureDatas, humidityDatas, windDatas, precipitationDatas } from '../json/uniqueWeatherDatas';

type fetchedWeatherType = {
    [key: string]: string | number | {
        [key: string]: string | number[];
    };
} | null;

function DailyHoursWeather() {
    const fetchedWeather:fetchedWeatherType = useRecoilValue(recoilWeather),
        today = new Date(),
        hourActually = today.getHours() + 1,
        slicedWeatherLength = fetchedWeather !== null && fetchedWeather['hourly'] instanceof Object && Object.keys(fetchedWeather['hourly']['temperature_2m']).slice(hourActually, 24).length;

    return(
        fetchedWeather !== null && slicedWeatherLength ? (
            <>
                <h2 className='text-xl'>Prochaines heures</h2>
                <section className='flex w-full h-auto m-5 p-2 md:max-w-3xl border-2 border-black overflow-y-hidden overflow-x-scroll scrolling-touch shadow-sm shadow-black rounded transition dark:shadow-md dark:shadow-white dark:border-white'>
                    <ul className='flex flex-nowrap'>
                        {fetchedWeather['hourly'] instanceof Object && (
                            Object.keys(fetchedWeather['hourly']['temperature_2m']).slice(hourActually, 24)?.map((n) => (
                                <li className='flex p-2 w-full max-w-sm shrink-0 flex-wrap shadow-right-box transition dark:shadow-right-box-dark'  key={n}>
                                    <h3 className='w-full text-center text-lg'>{n}h00</h3>
                                    <div className='w-1/2'>
                                        <WeatherPicture sunsetRise={fetchedWeather['daily'] instanceof Object && [fetchedWeather['daily']['sunrise']['0'], fetchedWeather['daily']['sunset']['0']]} datasArray={fetchedWeather['hourly']} iteration={n} />
                                    </div>
                                    <ul className='flex flex-col flex-wrap w-1/2 items-center justify-center'>
                                        <li>
                                            <UniqueWeatherData className='text-2xl' weatherData={fetchedWeather} uniqueData={temperatureDatas} iteration={n} day={0}/>
                                        </li>
                                        <li>
                                            <UniqueWeatherData className='text-xl' weatherData={fetchedWeather} uniqueData={humidityDatas} iteration={n} day={0} />
                                        </li>
                                        <li>
                                            <UniqueWeatherData className='text-xl' weatherData={fetchedWeather} uniqueData={windDatas} iteration={n} day={0} />
                                        </li>
                                        <li>
                                            <UniqueWeatherData className='text-xl' weatherData={fetchedWeather} uniqueData={precipitationDatas} iteration={n} day={0} />
                                        </li>
                                    </ul>
                                </li>
                            ))
                        )}
                    </ul>
                </section>
            </>
        ) : null
    );
}

export default DailyHoursWeather;
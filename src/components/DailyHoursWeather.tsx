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
                <h2>Prochaines heures</h2>
                <section className='flex w-full h-auto m-5 p-2 md:max-w-3xl overflow-y-hidden overflow-x-scroll scrolling-touch shadow-sm shadow-black rounded dark:shadow-md dark:shadow-white'>
                    <ul className='flex flex-nowrap'>
                        {fetchedWeather['hourly'] instanceof Object && (
                            Object.keys(fetchedWeather['hourly']['temperature_2m']).slice(hourActually, 24)?.map((n) => (
                                <li className='flex p-2 w-full shrink-0 flex-wrap md:max-w-fit shadow-right-box dark:shadow-right-box-dark' key={n}>
                                    <h2 className='w-full text-center'>{n}h00</h2>
                                    <div className='w-1/2'>
                                        <WeatherPicture sunset={fetchedWeather['daily'] instanceof Object && fetchedWeather['daily']['sunset']['0']} datasArray={fetchedWeather['hourly']} iteration={n} />
                                    </div>
                                    <ul className='flex flex-col flex-wrap w-1/2 items-center'>
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
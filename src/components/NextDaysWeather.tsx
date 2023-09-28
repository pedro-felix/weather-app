import WeatherPicture from './WeatherPicture';
import UniqueWeatherData from './UniqueWeatherData';
import WeatherMinMaxTemp from './WeatherMinMaxTemp';
import { useRecoilValue } from 'recoil';
import { recoilWeather } from '../state/atoms';
import { dateFromInt } from '../helper';
import { humidityDatas, windDatas, precipitationDatas } from '../json/uniqueWeatherDatas';

type fetchedWeatherType = {
    [key: string]: string | number | {
        [key: string]: string | number[]
    };
} | null;

function NextDaysWeather() {
    const fetchedWeather:fetchedWeatherType = useRecoilValue(recoilWeather);

    return(
        fetchedWeather !== null ? (
            <>
                <h2 className='text-xl'>Prochains jours</h2>
                <section className='flex w-full h-auto m-5 p-2 md:max-w-3xl overflow-y-hidden overflow-x-scroll scrolling-touch shadow-sm shadow-black rounded dark:shadow-md dark:shadow-white'>
                    <ul className='flex flex-nowrap'>
                        {fetchedWeather['daily'] instanceof Object && Object.keys(fetchedWeather['daily']['sunset']).map((day) => {
                            return day !== '0' ? (
                                <li className='flex p-2 w-1/2 shrink-0 flex-wrap shadow-right-box dark:shadow-right-box-dark' key={day}>
                                    <h3 className='w-full text-center text-lg'>{dateFromInt(Number(day))}</h3>
                                    <div className='w-1/2'>
                                        <WeatherPicture sunset={fetchedWeather['daily'] instanceof Object && fetchedWeather['daily']['sunset'][Number(day)]} datasArray={fetchedWeather['hourly']} iteration={12} />
                                    </div>
                                    <ul className='flex flex-col flex-wrap w-1/2 items-center'>
                                        <li>
                                            <WeatherMinMaxTemp minMaxTempData={fetchedWeather} iteration={Number(day)} />
                                        </li>
                                        <li>
                                            <UniqueWeatherData weatherData={fetchedWeather} uniqueData={humidityDatas} iteration={12} day={Number(day)} />
                                        </li>
                                        <li>
                                            <UniqueWeatherData weatherData={fetchedWeather} uniqueData={windDatas} iteration={12} day={Number(day)} />
                                        </li>
                                        <li>
                                            <UniqueWeatherData weatherData={fetchedWeather} uniqueData={precipitationDatas} iteration={12} day={Number(day)} />
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                null
                            );
                        })}
                    </ul>
                </section>
            </>
        ) : null
    );
}

export default NextDaysWeather;
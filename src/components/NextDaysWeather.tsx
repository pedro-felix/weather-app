import WeatherPicture from './WeatherPicture';
import UniqueWeatherData from './UniqueWeatherData';
import WeatherMinMaxTemp from './WeatherMinMaxTemp';
import { useRecoilValue } from 'recoil';
import { recoilWeather } from '../state/atoms';
import { dateFromRef } from '../helper';
import { humidityDatas, windDatas, precipitationDatas } from '../json/uniqueWeatherDatas';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { useRef } from 'react';

type fetchedWeatherType = {
    [key: string]: string | number | {
        [key: string]: string | number[]
    };
} | null;

function NextDaysWeather() {
    const fetchedWeather:fetchedWeatherType = useRecoilValue(recoilWeather),
        scrollRef = useRef<HTMLElement | null>(null),
        toDay = new Date().getDay();

    useHorizontalScroll(scrollRef);

    return(
        fetchedWeather !== null ? (
            <>
                <section className='flex flex-col justify-center items-center w-full h-auto m-5 p-2 md:max-w-3xl border-2 bg-white  border-black rounded dark:invert'>
                    <h2 className='text-xl'>Prochains jours</h2>
                    <section ref={scrollRef} className='flex w-full h-auto overflow-y-hidden overflow-x-scroll scrolling-touch transition'>
                        <ul className='flex flex-nowrap'>
                            {fetchedWeather['daily'] instanceof Object && Object.keys(fetchedWeather['daily']['sunset']).map((day) => {
                                return day !== '0' ? (
                                    <li className='flex p-2 w-full max-w-sm shrink-0 flex-wrap shadow-right-box' key={day}>
                                        <h3 className='w-full text-center text-lg'>{dateFromRef(toDay, Number(day))}</h3>
                                        <div className='w-1/2'>
                                            <WeatherPicture sunsetRise={fetchedWeather['daily'] instanceof Object && [fetchedWeather['daily']['sunrise'][Number(day)], fetchedWeather['daily']['sunset'][Number(day)]]} datasArray={fetchedWeather['hourly']} iteration={12} />
                                        </div>
                                        <ul className='flex flex-col flex-wrap w-1/2 items-center justify-center'>
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
                </section>
            </>
        ) : null
    );
}

export default NextDaysWeather;
import { useFetchWeather } from './hooks/useFetchWeather';
import DailyWeather from './components/DailyWeather';
import DailyHoursWeather from './components/DailyHoursWeather';
import NextDaysWeather from './components/NextDaysWeather';
import WeatherCitySearch from './components/WeatherCitySearch';
import Header from './components/Header';
import {useRecoilValue} from 'recoil';
import {recoilDarkMode, recoilWeatherParams} from './state/atoms';

function App() {
    const darkMode = useRecoilValue(recoilDarkMode),
        weatherParams = useRecoilValue(recoilWeatherParams),
        [isLoading, error] = useFetchWeather(weatherParams);

    return (
        <section className={`font-poppins${darkMode ? ' dark' : ''}`}>
            <main className='min-h-screen flex flex-col items-center dark:bg-black dark:text-white transition duration-500'>
                <Header />
                {isLoading ? (
                    <p>Chargement en cours</p>
                ) : (
                    error ? (
                        <p>{error.toString()}</p>
                    ) : (
                        <>
                            <WeatherCitySearch />
                            <DailyWeather />
                            <DailyHoursWeather />
                            <NextDaysWeather />
                        </>
                    )
                )}
            </main>
        </section>
    );
}

export default App;

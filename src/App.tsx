import { useFetchWeather } from './hooks/useFetchWeather';
import DailyWeather from './components/DailyWeather';
import DailyHoursWeather from './components/DailyHoursWeather';
import NextDaysWeather from './components/NextDaysWeather';
import WeatherCitySearch from './components/WeatherCitySearch';
import Header from './components/Header';
import {useRecoilValue} from 'recoil';
import {recoilDarkMode, recoilWeatherParams} from './state/atoms';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
    const darkMode = useRecoilValue(recoilDarkMode),
        weatherParams = useRecoilValue(recoilWeatherParams),
        [isLoading, error] = useFetchWeather(weatherParams);

    return (
        <section className={`bg-[url('/src/assets/bg.jpeg')] font-poppins${darkMode ? ' dark transition transition-500' : ''}`}>
            <main className='backdrop-grayscale min-h-screen flex flex-col items-center p-2 md:p-0 transition duration-500 dark:backdrop-invert'>
                <Header />
                {isLoading ? (
                    <Loader />
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
                <Footer />
            </main>
        </section>
    );
}

export default App;

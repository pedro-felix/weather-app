import { useFetchWeather } from './hooks/useFetchWeather';
import DailyWeather from './components/DailyWeather';
import DailyHoursWeather from './components/DailyHoursWeather';
import NextDaysWeather from './components/NextDaysWeather';
import WeatherCitySearch from './components/WeatherCitySearch';
import Header from './components/Header';
import {useRecoilValue} from 'recoil';
import {recoilWeatherParams} from './state/atoms';

function App() {
    const weatherParams = useRecoilValue(recoilWeatherParams),
        [isLoading, error] = useFetchWeather(weatherParams);

    return (
        <main>
            <Header />
            <hr />
            {isLoading ? (
                <p>Chargement en cours</p>
            ) : (
                error ? (
                    <p>{error.toString()}</p>
                ) : (
                    <>
                        <WeatherCitySearch />
                        <hr />
                        <DailyWeather />
                        <hr />
                        <DailyHoursWeather />
                        <hr />
                        <NextDaysWeather />
                    </>
                )
            )}
        </main>
    );
}

export default App;

import { useState } from 'react';
import { useFetchWeather } from './hooks/useFetchWeather';
import DailyWeather from './components/DailyWeather';
import DailyHoursWeather from './components/DailyHoursWeather';
import NextDaysWeather from './components/NextDaysWeather';
import WeatherCitySearch from './components/WeatherCitySearch';
import Header from './components/Header';

function App() {
    const [cityValue, setCityValue] = useState(''),
        [weatherParams, setWeatherParams] = useState<{[key:string]: string | number | null}>({
            'lang':'fr',
            'latitude': null,
            'longitude': null,
            'hourly': 'temperature_2m,relativehumidity_2m,windspeed_10m,weathercode',
            'daily': 'temperature_2m_max,temperature_2m_min,weathercode,sunset',
            'forecast_days': 7,
            'timezone': 'auto'
        }),
        [isLoading, error, fetchedWeather] = useFetchWeather(weatherParams);

    return (
        <main>
            {isLoading ? (
                <p>Chargement en cours</p>
            ) : (
                error ? (
                    <p>{error.toString()}</p>
                ) : (
                    <>
                        <Header />
                        <hr />
                        <WeatherCitySearch cityValue={cityValue} setCityValue={setCityValue} setWeatherParams={setWeatherParams} />
                        <hr />
                        <DailyWeather fetchedWeather={fetchedWeather} />
                        <hr />
                        <DailyHoursWeather fetchedWeather={fetchedWeather} />
                        <hr />
                        <NextDaysWeather fetchedWeather={fetchedWeather} />
                    </>
                )
            )}
        </main>
    );
}

export default App;

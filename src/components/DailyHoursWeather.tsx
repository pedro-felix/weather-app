import WeatherPicture from './WeatherPicture';
import WeatherTemperature from './WeatherTemperature';
import WeatherHumidity from './WeatherHumidity';
import WeatherWind from './WeatherWind';

type Props = {
    fetchedWeather: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        };
    }
};

function DailyHoursWeather({fetchedWeather}: Props) {
    const today = new Date(),
        hourActually = today.getHours() + 1;

    return(
        <>
            <section>
                <ul>
                    {fetchedWeather['hourly'] instanceof Object && (
                        Object.keys(fetchedWeather['hourly']['temperature_2m']).slice(hourActually, 24).map((n) => (
                            <li key={n}>
                                <ul>
                                    <li>
                                        <WeatherTemperature temperatureData={fetchedWeather} iteration={n} day={0}/>
                                    </li>
                                    <li>
                                        <WeatherHumidity humidityData={fetchedWeather} iteration={n} day={0} />
                                    </li>
                                    <li>
                                        <WeatherWind windData={fetchedWeather} iteration={n} day={0}/>
                                    </li>
                                    <li>
                                        <WeatherPicture sunset={fetchedWeather['daily'] instanceof Object && fetchedWeather['daily']['sunset']['0']} datasArray={fetchedWeather['hourly']} iteration={n} />
                                    </li>
                                </ul>
                            </li>
                        ))
                    )}
                </ul>
            </section>
        </>
    );
}

export default DailyHoursWeather;
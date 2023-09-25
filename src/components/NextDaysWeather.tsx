import WeatherPicture from './WeatherPicture';
import WeatherHumidity from './WeatherHumidity';
import WeatherWind from './WeatherWind';
import WeatherMinMaxTemp from './WeatherMinMaxTemp';

type Props = {
    fetchedWeather: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        };
    }
};

function NextDaysWeather({fetchedWeather}: Props) {
    return(
        <section>
            {fetchedWeather['daily'] instanceof Object && Object.keys(fetchedWeather['daily']['sunset']).map((day) => {
                return day !== '0' ? (
                    <ul key={day}>
                        <li>
                            <WeatherMinMaxTemp minMaxTempData={fetchedWeather} iteration={Number(day)} />
                        </li>
                        <li>
                            <WeatherHumidity humidityData={fetchedWeather} iteration={12} day={Number(day)} />
                        </li>
                        <li>
                            <WeatherWind windData={fetchedWeather} iteration={12} day={Number(day)} />
                        </li>
                        <li>
                            <WeatherPicture sunset={fetchedWeather['daily'] instanceof Object && fetchedWeather['daily']['sunset'][Number(day)]} datasArray={fetchedWeather['hourly']} iteration={12} />
                        </li>
                    </ul>
                ) : (
                    null
                );
            })}
        </section>
    );
}

export default NextDaysWeather;
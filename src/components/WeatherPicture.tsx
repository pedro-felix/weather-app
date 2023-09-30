import { weatherIconsJson } from '../json/weatherIcons';
import { isItDay } from '../helper';

type Props = {
    sunsetRise: [string | number | false, string | number | false] | false,
    datasArray: string | number | { [key: string]: string | number[]},
    iteration: string | number
}

function WeatherPicture({sunsetRise, datasArray, iteration}: Props) {
    const iterationTime = datasArray instanceof Object && datasArray['time'][Number(iteration)].toString().split('T')[1],
        iterationWeatherCode = datasArray instanceof Object && datasArray['weathercode'][Number(iteration)].toString() || '',
        partofDay = isItDay(sunsetRise, iterationTime) ? 'day': 'night';

    return (
        <figure className='w-full'>
            <img className='w-full dark:invert' src={weatherIconsJson[iterationWeatherCode][partofDay]['image'].toString() || ''} alt={weatherIconsJson[iterationWeatherCode][partofDay]['description'].toString() || ''} />
        </figure>
    );
}

export default WeatherPicture;
import { weatherIconsJson } from '../json/weatherIcons';

type Props = {
    sunset: string | number | false,
    datasArray: string | number | { [key: string]: string | number[]},
    iteration: string | number
}

function WeatherPicture({sunset, datasArray, iteration}: Props) {
    const sunsetToDay = sunset.toString().split('T')[1] || '20:00';

    return (
        <img src={datasArray instanceof Object && weatherIconsJson[datasArray['weathercode'][Number(iteration)].toString()][datasArray['time'][Number(iteration)].toString().split('T')[1] > sunsetToDay ? 'night' : 'day']['image'].toString() || ''} alt={datasArray instanceof Object && weatherIconsJson[datasArray['weathercode'][Number(iteration)].toString()]['day']['description'].toString() || ''} />
    );
}

export default WeatherPicture;
type Props = {
    humidityData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    iteration: string | number,
    day: number
}

function WeatherHumidity ({humidityData, iteration, day}: Props) {
    return (
        <>
            Humidité: 
            {humidityData['hourly'] instanceof Object && humidityData['hourly']['relativehumidity_2m'][24 * day + Number(iteration)]}
            {humidityData['hourly_units'] instanceof Object && humidityData['hourly_units']['relativehumidity_2m']}
        </>
    );
}

export default WeatherHumidity;
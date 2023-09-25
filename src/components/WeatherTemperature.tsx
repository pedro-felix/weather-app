type Props = {
    temperatureData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    iteration: string | number,
    day: number
}

function WeatherTemperature ({temperatureData, iteration, day}: Props) {
    return (
        <>
            Température: 
            {temperatureData['hourly'] instanceof Object && temperatureData['hourly']['temperature_2m'][24 * day + Number(iteration)]}
            {temperatureData['hourly_units'] instanceof Object && temperatureData['hourly_units']['temperature_2m']}
        </>
    );
}

export default WeatherTemperature;
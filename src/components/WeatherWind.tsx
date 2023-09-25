type Props = {
    windData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    iteration: string | number,
    day: number
}

function WeatherWind ({windData, iteration, day}: Props) {
    return (
        <>
            Vent:
            {windData['hourly'] instanceof Object &&  windData['hourly']['windspeed_10m'][24 * day + Number(iteration)]}
            {windData['hourly_units'] instanceof Object && windData['hourly_units']['windspeed_10m']}
        </>
    );
}

export default WeatherWind;
type Props = {
    minMaxTempData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    iteration: number
}

function WeatherMinMaxTemp ({minMaxTempData, iteration}: Props) {
    return (
        <>
             Minimal/Maximal:
            {minMaxTempData['daily'] instanceof Object && (
                `${minMaxTempData['daily']['temperature_2m_min'][iteration]}/${minMaxTempData['daily']['temperature_2m_max'][iteration]}`
            )}
        </>
    );
}

export default WeatherMinMaxTemp;
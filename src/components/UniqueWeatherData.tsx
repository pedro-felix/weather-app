import { useRecoilValue } from 'recoil';
import { recoilDarkMode } from '../state/atoms';
import {getImgUrl} from '../helper';
import { rotateClasses } from '../json/tailwindRotateClasses';

type Props = {
    className?: string,
    weatherData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    uniqueData: {[key:string]:string},
    iteration: string | number,
    day: number
}

function UniqueWeatherData ({className, weatherData, uniqueData, iteration, day}: Props) {
    const darkMode = useRecoilValue(recoilDarkMode),
        windDirection = uniqueData['dataKey'] === 'windspeed_10m' && weatherData['hourly'] instanceof Object && weatherData['hourly']['winddirection_10m'][24 * day + Number(iteration)].toString() || '0';
    return (
        <section className='grid grid-cols-2auto'>
            <figure className={`h-full transform ${rotateClasses[windDirection]}`}>
                {darkMode ? (
                    <img className='h-full object-cover' src={getImgUrl(uniqueData['imgDark'])} alt={uniqueData['imgAlt']} />
                ) : (
                    <img className='h-full object-cover' src={getImgUrl(uniqueData['imgLight'])} alt={uniqueData['imgAlt']} />
                )}
            </figure>
            <p className={className || ''}>
                {weatherData['hourly'] instanceof Object && weatherData['hourly'][uniqueData['dataKey']][24 * day + Number(iteration)]}
                {weatherData['hourly_units'] instanceof Object && weatherData['hourly_units'][uniqueData['dataKey']]}
            </p>
        </section>
    );
}

export default UniqueWeatherData;
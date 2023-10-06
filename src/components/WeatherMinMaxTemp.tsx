import { useRecoilValue } from 'recoil';
import { recoilDarkMode } from '../state/atoms';
import {getImgUrl} from '../helper';

type Props = {
    className?: string,
    minMaxTempData: {
        [key: string]: string | number | {
            [key: string]: string | number[];
        }
    },
    iteration: number
}

function WeatherMinMaxTemp ({className, minMaxTempData, iteration}: Props) {
    const darkMode = useRecoilValue(recoilDarkMode);

    return (
        <section className='grid grid-cols-3auto'>
            <figure className='h-full dark:invert'>
                {darkMode ? (
                    <img className='h-full' src={getImgUrl('thermometer-min-dark.svg')} alt="Température minimale" />
                ) : (
                    <img className='h-full' src={getImgUrl('thermometer-min-light.svg')} alt="Température minimale" />
                )}
            </figure>
            {minMaxTempData['daily'] instanceof Object && (
                <p className={className}>
                    {minMaxTempData['daily']['temperature_2m_min'][iteration]}/{minMaxTempData['daily']['temperature_2m_max'][iteration]}
                </p>
            )}
            <figure className='h-full'>
                {darkMode ? (
                    <img className='h-full' src={getImgUrl('thermometer-max-dark.svg')} alt="Température maximale" />
                ) : (
                    <img className='h-full' src={getImgUrl('thermometer-max-light.svg')} alt="Température maximale" />
                )}
            </figure>
        </section>
    );
}

export default WeatherMinMaxTemp;
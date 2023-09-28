import { useRecoilValue } from 'recoil';
import { recoilDarkMode } from '../state/atoms';
import {getImgUrl} from '../helper';

function Loader() {
    const darkMode = useRecoilValue(recoilDarkMode);

    return (
        <section className='flex flex-1 flex-col justify-center'>
            <figure className='w-40 animate-spin-slow'>
                {darkMode ? (
                    <img className='h-full' src={getImgUrl('loader-dark.svg')} alt='Chargement en cours' />
                ) : (
                    <img className='h-full' src={getImgUrl('loader-light.svg')} alt='Chargement en cours' />
                )}
            </figure>
        </section>
    );
}

export default Loader;
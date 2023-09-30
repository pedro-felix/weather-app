import {getImgUrl} from '../helper';

function Loader() {
    return (
        <section className='flex flex-1 flex-col justify-center'>
            <figure className='w-40 animate-spin-slow'>
                <img className='h-full' src={getImgUrl('loader-light.svg')} alt='Chargement en cours' />
            </figure>
        </section>
    );
}

export default Loader;
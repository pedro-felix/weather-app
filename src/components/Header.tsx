import DarkMode from './DarkMode';
import { liveTime } from '../helper';
import { getImgUrl } from '../helper';

function Header() {
    return (
        <header className='sticky top-0 z-10 h-11 flex flex-row bg-white transition justify-between items-center p-2 w-full dark:invert'>
            <section className='h-full flex flex-row gap-2 items-center'>
                <img className='h-full' src={getImgUrl('free-weather.svg')} alt='Logo Free Weather' />
                <h1 className='font-bold text-md md:text-xl'>
                    {liveTime()}
                </h1>
            </section>
            <DarkMode />
        </header>
    );
}

export default Header;
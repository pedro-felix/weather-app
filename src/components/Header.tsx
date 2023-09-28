import DarkMode from './DarkMode';
import { liveTime } from '../helper';

function Header() {
    return (
        <header className='sticky top-0 z-10 h-11 flex flex-row bg-white justify-between items-center p-2 w-full shadow-sm shadow-black dark:bg-black dark:shadow-white'>
            <h1 className='font-bold text-xl'>
                {liveTime()}
            </h1>
            <DarkMode />
        </header>
    );
}

export default Header;
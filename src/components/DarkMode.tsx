import {useRecoilState} from 'recoil';
import {recoilDarkMode} from '../state/atoms';

function DarkMode() {
    const [darkMode, setDarkMode] = useRecoilState(recoilDarkMode),
        darkModeCss = `cursor-pointer box-content relative h-6 w-12 border-2 border-black rounded-2xl ${darkMode ? 'bg-toggle-light' : 'bg-toggle-dark'} bg-no-repeat transition-all duration-500 dark:flex-row dark:bg-right dark:border-white before:content-[''] before:block before:w-6 before:h-6 before:z1 before:absolute before:right-0 before:rounded-full before:bg-black before:transition-all before:duration-500 dark:before:right-full dark:before:translate-x-full dark:before:bg-white dark:invert`;

    return (
        <label className={darkModeCss}>
            <input className='hidden' type="checkbox" onChange={() => setDarkMode(!darkMode)} />
        </label>
    );
}

export default DarkMode;
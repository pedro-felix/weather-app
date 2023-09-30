import { getImgUrl } from '../helper';

function Footer() {
    return (
        <footer className='flex flex-row flex-wrap h-20 gap-2 bg-black justify-center items-center p-2 w-full text-white dark:invert'>
            <img className='h-full' src={getImgUrl('free-weather.svg')} alt='Logo Free Weather' />
            <p>
                Coded By <a target="_blank" className='underline' href='https://www.linkedin.com/in/pedro-felix-03b03962/' rel="noreferrer">Pedro Felix</a>
            </p>
        </footer>
    );
}

export default Footer;
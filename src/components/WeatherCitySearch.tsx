import { AutoComplete } from 'primereact/autocomplete';
import { useRef, useState } from 'react';
import { getWeatherCity } from '../api/weather';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme  
import 'primereact/resources/primereact.min.css'; //core
import {useRecoilState, useSetRecoilState} from 'recoil';
import {recoilCityValue, recoilWeatherParams} from '../state/atoms';

function WeatherCitySearch() {
    const [localRecoilCityValue, setRecoilCityValue] = useRecoilState(recoilCityValue),
        [cityValue, setCityValue] = useState(localRecoilCityValue),
        setWeatherParams = useSetRecoilState(recoilWeatherParams),
        [results, setResults] = useState<{[key:string]:string}[]>([]),
        [items, setItems] = useState<string[]>([]),
        ref = useRef<HTMLInputElement | null>(null);

    async function search() {
        const searchValue = ref.current === null ? '' : ref.current.value,
            response = await getWeatherCity(searchValue),
            itemsArray:string[] = [];
        response.results ? setResults(response.results) : response.name ? setResults(response.name) : setResults([]);
        response.results && response.results.map((result:{[key:string]:string | number}) => itemsArray.push(`${result['name']}, ${result['admin1']}, ${result['country']}`));
        setItems(itemsArray);
    }

    function select(selectedValue:string) {
        const indexOfselectedValue = items.indexOf(selectedValue),
            cityCoordinates = {
                'latitude': results[indexOfselectedValue].latitude,
                'longitude': results[indexOfselectedValue].longitude
            };

        setWeatherParams(prevState => {
            return {
                ...prevState,
                ...cityCoordinates
            };
        });
        localStorage.setItem('cityCoordinates', JSON.stringify(cityCoordinates));

        setRecoilCityValue(selectedValue);
        localStorage.setItem('weatherCityValue', selectedValue);
    }

    return (
        <section className='flex-1 sticky z-10 top-16 w-full m-5 md:max-w-3xl dark:invert'>
            <AutoComplete
                className='w-full'
                inputClassName='w-full !border-2 !border-black !text-black transition-all'
                placeholder="Rechercher une ville"
                inputRef={ref}
                appendTo='self'
                value={cityValue}
                suggestions={items}
                completeMethod={search}
                onSelect={(e) => select(e.value)}
                onChange={(e) => setCityValue(e.value)}
            />
        </section>
    );
}

export default WeatherCitySearch;
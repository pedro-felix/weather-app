import { AutoComplete } from 'primereact/autocomplete';
import { useRef, useState } from 'react';
import React from 'react';
import { getWeatherCity } from '../api/weather';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme  
import 'primereact/resources/primereact.min.css'; //core

type Props = {
    cityValue: string,
    setCityValue: React.Dispatch<React.SetStateAction<string>>
    setWeatherParams: React.Dispatch<React.SetStateAction<{[key:string]: string | number | null}>>
}

function WeatherCitySearch({cityValue, setCityValue, setWeatherParams}: Props) {
    const [results, setResults] = useState<{[key:string]:string}[]>([]),
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
        const indexOfselectedValue = items.indexOf(selectedValue);
        setWeatherParams((prevState) => ({
            ...prevState,
            ['latitude']: results[indexOfselectedValue].latitude,
            ['longitude']: results[indexOfselectedValue].longitude
        }));
    }

    return (
        <AutoComplete placeholder="Rechercher une ville" inputRef={ref} appendTo='self' value={cityValue} suggestions={items} completeMethod={search} onSelect={(e) => select(e.value)} onChange={(e) => setCityValue(e.value)}  />
    );
}

export default WeatherCitySearch;
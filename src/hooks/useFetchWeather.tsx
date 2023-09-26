import { useEffect, useState } from 'react';
import { getWeather } from '../api/weather';
import { getErrorMessage } from '../helper';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { recoilCityValue, recoilWeather } from '../state/atoms';

export function useFetchWeather(weatherParams: {[key: string]: string|number|null}): [boolean, string | null] {
    const setWeather = useSetRecoilState(recoilWeather);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState<string | null>(null);
    const cityValue = useRecoilValue(recoilCityValue);

    useEffect(() => {
        const localWeatherParams = localStorage.getItem('weatherParams') !== null && JSON.parse(localStorage.getItem('weatherParams') || '');

        let cancel = false;

        async function fetchData() {
            try {
                setIsLoading(true);
                if (!cancel) {
                    const fetchedWeather = await getWeather(weatherParams);
                    localStorage.setItem('weatherParams', JSON.stringify(fetchedWeather));
                    localStorage.setItem('weatherCityValue', JSON.stringify(cityValue));
                    setWeather(fetchedWeather);
                }
            } catch (error: unknown) {
                const errorMessage = getErrorMessage(error);
                setError(errorMessage);
            } finally {
                if (!cancel) {
                    setIsLoading(false);
                }
            }
        }

        if(weatherParams.latitude !== null) {
            fetchData();

            return () => {
                cancel = true;
            };
        } else if(localWeatherParams instanceof Object) {
            setWeather(localWeatherParams);
        }
    }, [weatherParams, setWeather, cityValue]);

    return [isLoading, error];
}
import { useEffect, useState } from 'react';
import { getWeather } from '../api/weather';
import { getErrorMessage } from '../helper';

export function useFetchWeather(weatherParams: {[key: string]: string|number|null}): [boolean, string | null, {[key:string]: string | number | {[key:string]: string | number[]}}] {
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState<string | null>(null);

    useEffect(() => {
        let cancel = false;
        
        async function fetchData() {
            try {
                setIsLoading(true);
                if (!cancel) {
                    const fetchedWeather = await getWeather(weatherParams);
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
        }
    }, [weatherParams]);
    
    return [isLoading, error, weather];
}
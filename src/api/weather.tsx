const WEATHER_API = 'https://api.open-meteo.com/v1',
    GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1';

export async function getWeather(weatherParams: {[key: string]: string|number|null}) {
    let weatherParamsString= '';
    Object.entries(weatherParams).map((option, key) => weatherParamsString += `${key === 0 ? '?' : '&'}${option[0]}=${option[1]}`).slice(1);
    const apiFetch = await fetch(`${WEATHER_API}/forecast${weatherParamsString}`),
        response = await apiFetch.json();
    if (apiFetch.ok) {
        return response;
    } else {
        throw new Error(response.reason);
    }
}

export async function getWeatherCity(query:string) {
    const apiFetch = await fetch(`${GEOCODING_API}/search?name=${query}`),
        response = await apiFetch.json();
    if (apiFetch.ok) {
        return response;
    } else {
        throw new Error(response.reason);
    }
}
import {atom} from 'recoil';

export const recoilDarkMode = atom({
    key: 'darkMode',
    default: JSON.parse(localStorage.getItem('darkMode') || '{"value":false}')['value'] as boolean
});

export const recoilCityValue = atom({
    key: 'cityValue',
    default: localStorage.getItem('weatherCityValue')?.replace(/"/g, '') || ''
});

export const recoilWeatherParams = atom({
    key: 'weatherParams',
    default: {
        'lang':'fr',
        'latitude': null as null | string,
        'longitude': null as null | string,
        'hourly': 'temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m,precipitation_probability,weathercode',
        'daily': 'temperature_2m_max,temperature_2m_min,weathercode,sunset,sunrise',
        'forecast_days': 7,
        'timezone': 'auto'
    }
});

export const recoilWeather = atom({
    key: 'weather',
    default: null as null | {[key: string]: string | number | {[key: string]: string | number[]}}
});
import {atom} from 'recoil';

export const recoilCityValue = atom({
    key: 'cityValue',
    default: '',
});

export const recoilWeatherParams = atom({
    key: 'weatherParams',
    default: {
        'lang':'fr',
        'latitude': null as null | string,
        'longitude': null as null | string,
        'hourly': 'temperature_2m,relativehumidity_2m,windspeed_10m,weathercode',
        'daily': 'temperature_2m_max,temperature_2m_min,weathercode,sunset',
        'forecast_days': 7,
        'timezone': 'auto'
    }
});

export const recoilWeather = atom({
    key: 'weather',
    default: {}
});
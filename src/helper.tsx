const daysArray = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export function getImgUrl(imgName:string) {
    return new URL(`./assets/${imgName}`, import.meta.url).toString();
}

export function liveTime() {
    const date = new Date(),
        monthesArray = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    return `${daysArray[date.getDay()]} ${date.getDate()} ${monthesArray[date.getUTCMonth()]} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes().toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false})}`;
}

export function dateFromInt(dayInt:number) {
    return daysArray[dayInt];
}

export function dateFromRef(dayRef:number, dayInt:number) {
    const indexOfDay = dayRef + dayInt <= 6 ? dayRef + dayInt : dayRef + dayInt - 7;
    return daysArray[indexOfDay];
}

type sunsetRise = [string | number | false, string | number | false] | false;

export function isItDay(sunsetRise:sunsetRise, iterationTime: string | false) {
    const sunriseToday = sunsetRise instanceof Array && sunsetRise[0].toString().split('T')[1] || '06:00',
        sunsetToDay = sunsetRise instanceof Array && sunsetRise[1].toString().split('T')[1] || '20:00';
        
    return iterationTime > sunriseToday && iterationTime < sunsetToDay;
}
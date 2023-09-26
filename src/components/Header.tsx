function Header() {
    const date = new Date(),
        daysArray = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        monthesArray = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return (
        <h1>{`${daysArray[date.getDay()]} ${date.getDate()} ${monthesArray[date.getUTCMonth()]} ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}</h1>
    );
}

export default Header;
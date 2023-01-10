
import { countries } from "../views/viewCountries.js";

//creates element and add upcoming div
export function createUpcomingHolidaysList(holidays) {
    const divHolidays = document.getElementById('upComing');
    divHolidays.textContent = '';

    while (divHolidays.firstChild) {
        divHolidays.removeChild(divHolidays.firstChild);
    }
    const h2element = document.createElement('h2');
    h2element.textContent = `Here are next public holidays World wide`;
    divHolidays.appendChild(h2element);
    holidays.forEach(holiday => {
        const divHolidayInfo = document.createElement('div');
        const pElementName = document.createElement('p');
        pElementName.textContent = `Name :${holiday.name}`;
        const pElementDate = document.createElement('p');
        pElementDate.textContent = `Date: ${holiday.date}`;
        const pElementCountry = document.createElement('p');
        const country = countries.find(element => element.countryCode == holiday.countryCode);
        pElementCountry.textContent = `Country: ${country.name}`;
        divHolidayInfo.className = 'holiday';

        divHolidayInfo.appendChild(pElementCountry);
        divHolidayInfo.appendChild(pElementName);
        divHolidayInfo.appendChild(pElementDate);
        divHolidays.appendChild(divHolidayInfo)
    });
}

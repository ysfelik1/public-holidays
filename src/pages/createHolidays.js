import { renderError } from "../utils/renderError.js";

//creates html element and adds in div 
export function createHolidaysList(holidays, explanationText) {
    try {
        const divContainer = document.getElementById('container');
        const divHolidays = document.getElementById('holidays');
        divHolidays.textContent = '';

        while (divHolidays.firstChild) {
            divHolidays.removeChild(divHolidays.firstChild);
        }
        const h2element = document.createElement('h2');
        h2element.textContent = `Here are holidays of ${explanationText}`;
        divHolidays.appendChild(h2element);

        holidays.forEach(holiday => {
            const divHolidayInfo = document.createElement('div');
            const pElementName = document.createElement('p');
            pElementName.textContent = `Name :${holiday.name}`;
            const pElementDate = document.createElement('p');
            pElementDate.textContent = `Date: ${holiday.date}`;
            divHolidayInfo.className = 'holiday';
            divHolidayInfo.appendChild(pElementName);
            divHolidayInfo.appendChild(pElementDate);
            divHolidays.appendChild(divHolidayInfo)
            divContainer.appendChild(divHolidays);

        });
    } catch (error) {
        renderError(error);
    }
}
import { renderError} from '../utils/renderError.js';
import { createHolidaysList } from '../pages/createHolidays.js';
import { fetchData } from './viewData.js';
export async function fetchPublicHolidays() {
    try {
        const year = document.getElementById('selectYear').value;
        const countryCode = document.getElementById('selectCountry').value;
        const countryName = document.getElementById('selectCountry').selectedOptions[0].text;

        const holidaysData = await fetchData(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        const holidays = await holidaysData.json();
        createHolidaysList(holidays, countryName)
    } catch (error) {
        renderError(error)
    }
}
import { fetchData } from './viewData.js';
import { renderError } from '../utils/renderError.js';
import { fetchNextHolidays } from './viewNextHolidays.js';
import { fetchIsTodayHoliday } from './viewIsTodayHoliday.js';
import { createCountriesSelect } from '../utils/createCountries.js';
import { fetchPublicHolidays } from './viewPublicHolidays.js';
import { createYearSelect } from '../utils/createYears.js';
/**
 * Get Countries Array and calls functions
 */
export let countries = '';
export async function fetchCountries() {
    try {
        const data = await fetchData("https://date.nager.at/api/v3/AvailableCountries")
        countries = await data.json();
        createCountriesSelect(countries);
        createYearSelect();
        fetchPublicHolidays();
        fetchNextHolidays();
        fetchIsTodayHoliday()
    } catch (error) {
        renderError(error);
    }
}
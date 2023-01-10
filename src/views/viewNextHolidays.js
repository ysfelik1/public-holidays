import { createUpcomingHolidaysList } from "../pages/createUpComingHolidays.js";
import { fetchData } from './viewData.js';
export async function fetchNextHolidays() {
    try {
        const nextHolidaysData = await fetchData('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');
        const holidays = await nextHolidaysData.json();
        createUpcomingHolidaysList(holidays);
    } catch (error) {
        renderError(error)
    }
}
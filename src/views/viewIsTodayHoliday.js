import { renderError } from '../utils/renderError.js';
import { fetchData } from './viewData.js';
import { createIsTodayHoliday } from '../pages/createIsTodayHoliday.js';

export async function fetchIsTodayHoliday() {
    try {
        const select = document.getElementById('selectCountry');
        var clone = select.cloneNode(true);
        clone.id = 'newSelect';
        const data = await fetchData(`https://date.nager.at/api/v3/IsTodayPublicHoliday/${clone.value}?offset=1`);
        
        createIsTodayHoliday(data,clone);
    } catch (error) {
        renderError(error)
    }
}
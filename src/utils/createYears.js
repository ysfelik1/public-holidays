
import { fetchPublicHolidays} from '../views/viewPublicHolidays.js' 
//creates years select and add page
export function createYearSelect() {
    const divContainer = document.getElementById('container');
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;
    let counter = startYear;
    const divSelects = document.getElementById('selections')
    const selectYear = document.createElement('select')
    selectYear.id = 'selectYear'
    while (counter <= endYear) {
        const yearOption = document.createElement('option')
        yearOption.textContent = counter
        selectYear.appendChild(yearOption)
        counter++;
    }
    selectYear.selectedIndex = 100
    selectYear.addEventListener('change', fetchPublicHolidays)
    divSelects.appendChild(selectYear)
    divContainer.appendChild(divSelects);
}
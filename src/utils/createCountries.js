import { renderError} from './renderError.js';
import { fetchPublicHolidays} from '../views/viewPublicHolidays.js' 
export function createCountriesSelect(countries) {
    try {
        const divContainer = document.getElementById('container');
        const divSelects = document.getElementById('selections')
        const elementSelect = document.createElement('select')
        elementSelect.id = 'selectCountry'
        elementSelect.selectedIndex = 0;

        countries.forEach(country => {
            const elementOption = document.createElement('option')
            elementOption.value = country.countryCode;
            elementOption.textContent = country.name;
            elementSelect.appendChild(elementOption);
        });
        elementSelect.addEventListener('change', fetchPublicHolidays)
        divSelects.appendChild(elementSelect);
        divContainer.appendChild(divSelects)
    } catch (error) {
        renderError(error);
    }

}
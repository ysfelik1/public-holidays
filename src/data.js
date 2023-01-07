async function fetchData(url) {
    const response = await fetch(url);

    if (response.ok) {
        return response;
    }
    throw new Error(`Error:${response.status}`);
}

async function fetchCountries() {
    try {
        const data = await fetchData("https://date.nager.at/api/v3/AvailableCountries")
        const countries = await data.json();
        createCountriesList(countries);

    } catch (error) {
        renderError(error);
    }
}
function createCountriesList(countries) {
    const divContainer = document.getElementById('container')
    const elementSelect = document.createElement('select')
    const defaultOption = document.createElement('option')
    defaultOption.textContent = "Choose a country"
    elementSelect.appendChild(defaultOption);
    
    elementSelect.addEventListener('change', fetchPublicHolidays)

    countries.forEach(country => {
        const elementOption = document.createElement('option')
        elementOption.value = country.countryCode;
        elementOption.textContent = country.name;

        elementSelect.appendChild(elementOption);
    });
    divContainer.appendChild(elementSelect);
}

function renderError(error) {
    const h1Element = document.createElement('h1');
    h1Element.textContent = error.message;
    h1Element.style.color = 'red';
    document.body.appendChild(h1Element);
}

async function fetchPublicHolidays(event) {
    if (event.target.value != -1) {
        try {
            const countryCode = event.target.value;
            const currentYear = new Date().getFullYear();
            const holidaysData = await fetchData(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`);
            const holidays = await holidaysData.json();
            createHolidaysList(holidays)
        } catch (error) {
            renderError(error);
        }
    }
}

createHolidaysList(holidays)
{
    const divContainer = document.getElementById('container');
    const divHolidays = document.getElementById('holidays');
    divHolidays.innerHTML = '<p>Here are holidays</p>'

    holidays.forEach(holiday => {
        const pElementName = document.createElement('p');
        pElementName.textContent = `Name :${holiday.name}`;
        const pElementDate = document.createElement('p');
        pElementDate.textContent = `Date: ${holiday.date}`;

        const divHolidayInfo = document.createElement('div');
        divHolidayInfo.className = 'holiday';
        divHolidayInfo.appendChild(pElementName);
        divHolidayInfo.appendChild(pElementDate);
        divHolidays.appendChild(divHolidayInfo)
        divContainer.appendChild(divHolidays);
        document.body.appendChild(divContainer);
    });
}

window.addEventListener('load', fetchCountries);
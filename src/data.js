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
        console.log(error);
    }
}
function createCountriesList(countries) {
    try {
        createYearList()
        const divSelects = document.getElementById('selections')
        const elementSelect = document.createElement('select')
        elementSelect.id = 'selectCountry'

        countries.forEach(country => {
            const elementOption = document.createElement('option')
            elementOption.value = country.countryCode;
            elementOption.textContent = country.name;

            elementSelect.appendChild(elementOption);
        });
        elementSelect.addEventListener('change', fetchPublicHolidays)
        divSelects.appendChild(elementSelect);

        document.body.appendChild(divSelects);
    } catch (error) {
        renderError(error);
        console.log(error)
    }

}
function createYearList() {

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
    document.body.appendChild(divSelects)
}

function renderError(error) {
    const h1Element = document.createElement('h1');
    h1Element.textContent = error.message;
    h1Element.style.color = 'red';
    document.body.appendChild(h1Element);
}

async function fetchPublicHolidays(event) {
    try {
        const selectYear = document.getElementById('selectYear')
        const selectCountry = document.getElementById('selectCountry')
        const countryCode = selectCountry.value;
        const year = selectYear.value
        const holidaysData = await fetchData(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        const holidays = await holidaysData.json();
        createHolidaysList(holidays)
    } catch (error) {
        renderError(error)
        console.log(error)
    }
}
function createHolidaysList(holidays) {
    try {
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
        });
        document.body.appendChild(divContainer);
    } catch (error) {
        renderError(error);
        console.log(error);
    }

}

window.addEventListener('load', fetchCountries);

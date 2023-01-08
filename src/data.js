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
        createCountriesSelect(countries);
        createYearSelect();
        fetchPublicHolidays()
    } catch (error) {
        renderError(error);
        console.log(error);
    }
}
function createCountriesSelect(countries) {
    try {

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

        document.body.appendChild(divSelects);
    } catch (error) {
        renderError(error);
        console.log(error)
    }

}
function createYearSelect() {

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
    alert(error.message)
}

async function fetchPublicHolidays() {
    try {
        const year = document.getElementById('selectYear').value;
        const countryCode = document.getElementById('selectCountry').value;
        const countryName = document.getElementById('selectCountry').selectedOptions[0].text;

        const holidaysData = await fetchData(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        const holidays = await holidaysData.json();
        createHolidaysList(holidays, countryName)
    } catch (error) {
        renderError(error)
        console.log(error)
    }
}
function createHolidaysList(holidays, countryName) {
    try {
        const divContainer = document.getElementById('container');
        const divHolidays = document.getElementById('holidays');
        divHolidays.textContent = '';
        
        
        while (divHolidays.firstChild) {
            divHolidays.removeChild(divHolidays.firstChild);
          }
      
          const h2element =document.createElement('h2');
          h2element.textContent=`Here are holidays of ${countryName}`;
          divHolidays.appendChild(h2element);

       
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

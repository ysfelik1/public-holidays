
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
<<<<<<< HEAD:src/app.js
        fetchPublicHolidays();
        fetchNextHolidays();
=======
        fetchPublicHolidays()
>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js
    } catch (error) {
        renderError(error);
        console.log(error);
    }
}
<<<<<<< HEAD:src/app.js
const divContainer = document.getElementById('container');
function createCountriesSelect(countries) {
    try {
=======
function createCountriesSelect(countries) {
    try {

>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js
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
        document.body.appendChild(divContainer);
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
    divContainer.appendChild(divSelects);
    document.body.appendChild(divContainer)
}
function renderError(error) {
    alert(error.message)
}
<<<<<<< HEAD:src/app.js
=======

>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js
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
<<<<<<< HEAD:src/app.js
function createHolidaysList(holidays, explanationText) {
=======
function createHolidaysList(holidays, countryName) {
>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js
    try {
       
        const divHolidays = document.getElementById('holidays');
        divHolidays.textContent = '';
<<<<<<< HEAD:src/app.js

        while (divHolidays.firstChild) {
            divHolidays.removeChild(divHolidays.firstChild);
        }
        const h2element = document.createElement('h2');
        h2element.textContent = `Here are holidays of ${explanationText}`;
        divHolidays.appendChild(h2element);
=======
        
        
        while (divHolidays.firstChild) {
            divHolidays.removeChild(divHolidays.firstChild);
          }
      
          const h2element =document.createElement('h2');
          h2element.textContent=`Here are holidays of ${countryName}`;
          divHolidays.appendChild(h2element);
>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js

       
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
        document.body.appendChild(divContainer);
    } catch (error) {
        renderError(error);
        console.log(error);
    }
<<<<<<< HEAD:src/app.js
}
function createUpcomingHolidaysList(holidays)
{
    const divHolidays = document.getElementById('upComing');
    divHolidays.textContent = '';

    while (divHolidays.firstChild) {
        divHolidays.removeChild(divHolidays.firstChild);
    }
    const h2element = document.createElement('h2');
        h2element.textContent = `Here are next public holidays World wide`;
        divHolidays.appendChild(h2element);
    holidays.forEach(holiday => {
        const divHolidayInfo = document.createElement('div');




        const pElementName = document.createElement('p');
        pElementName.textContent = `Name :${holiday.name}`;
        const pElementDate = document.createElement('p');
        pElementDate.textContent = `Date: ${holiday.date}`;
        const pElementCountry = document.createElement('p');
        pElementCountry.textContent = `Country: ${holiday.countryCode}`;
        
        divHolidayInfo.className = 'holiday';

        divHolidayInfo.appendChild(pElementName);
        divHolidayInfo.appendChild(pElementDate);
        divHolidayInfo.appendChild(pElementCountry);
        divHolidays.appendChild(divHolidayInfo)
        
    });
    document.body.appendChild(divHolidays);
=======
>>>>>>> 25dd93a7335be268db1bac510c56286d0520687a:src/data.js
}

async function fetchNextHolidays(){
    try {
        const nextHolidaysData = await fetchData('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');
        const holidays = await nextHolidaysData.json();
        createUpcomingHolidaysList(holidays);
    } catch (error) {
        renderError(error)
        console.log(error)
    }
}
window.addEventListener('load', fetchCountries);

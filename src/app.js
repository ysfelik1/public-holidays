async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response;
    }
    throw new Error(`Error:${response.status}`);
}
let  countries='';
async function fetchCountries() {
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
const divContainer = document.getElementById('container');
function createCountriesSelect(countries) {
    try {
        const divIsToday = document.getElementById('isToday');
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
        console.log(error);
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
    }
}
function createHolidaysList(holidays, explanationText) {
    try {
        const divHolidays = document.getElementById('holidays');
        divHolidays.textContent = '';

        while (divHolidays.firstChild) {
            divHolidays.removeChild(divHolidays.firstChild);
        }
        const h2element = document.createElement('h2');
        h2element.textContent = `Here are holidays of ${explanationText}`;
        divHolidays.appendChild(h2element);

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
    }
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
        const country= countries.find(element => element.countryCode== holiday.countryCode );

        pElementCountry.textContent = `Country: ${country.name}`;
        
        divHolidayInfo.className = 'holiday';
        divHolidayInfo.appendChild(pElementCountry);
        divHolidayInfo.appendChild(pElementName);
        divHolidayInfo.appendChild(pElementDate);
        divHolidays.appendChild(divHolidayInfo)
        
    });
    document.body.appendChild(divHolidays);
}

async function fetchNextHolidays(){
    try {
        const nextHolidaysData = await fetchData('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');
        const holidays = await nextHolidaysData.json();
        createUpcomingHolidaysList(holidays);
    } catch (error) {
        renderError(error)
    }
}
async function fetchIsTodayHoliday() {
    try {
       
        const select = document.getElementById('selectCountry');
        var clone = select.cloneNode(true);
        clone.id = 'newSelect';
        const divIsToday=document.getElementById('isToday');
        const h2element=document.createElement('h2');

        const data = await fetchData(`https://date.nager.at/api/v3/IsTodayPublicHoliday/${clone.value}?offset=1`);
        if(data.status==200)
        {
            h2element.textContent='Today is a public holiday';
           
        }else{
            h2element.textContent='Today is not public holiday';
            h2element.style.color='red';
        }
       
        clone.addEventListener('change', fetchIsTodayHoliday)
        divIsToday.appendChild(clone);
        divIsToday.appendChild(h2element);
        if (divIsToday.childNodes.length > 3) {

            for (let i = 0; i <2; i++) {
                divIsToday.removeChild(divIsToday.childNodes[3]);
            }
        }
        document.body.appendChild(divIsToday);
        
    } catch (error) {
        renderError(error)
    }
}

window.addEventListener('load', fetchCountries);

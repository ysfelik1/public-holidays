
async function fetchData(url) {
    const response = await fetch(url);
  
    if (response.ok) {
      return response;
    }
    throw new Error(`Error:${response.status}`);
  
  }
  
  
  async function createCountriesList() {
    //const response= await fetch("https://date.nager.at/api/v3/CountryInfo/tr");
    //const response= await fetch("https://date.nager.at/api/v3/PublicHolidays/2023/tr");
    //const response= await fetch("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide");
  
    const data = await fetchData("https://date.nager.at/api/v3/AvailableCountries")
    const countriesArray = await data.json();
    console.log(countriesArray);
    const divContainer = document.getElementById('container')
    const elementSelect = document.createElement('select')
  
    countriesArray.forEach(country => {
      const elementOption = document.createElement('option')
      elementOption.value = country.countryCode;
      elementOption.textContent = country.name;
  
      elementSelect.appendChild(elementOption);
    });
    divContainer.appendChild(elementSelect);
  
  }
  
  createCountriesList()
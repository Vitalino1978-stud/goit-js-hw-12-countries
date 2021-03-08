import { debounce } from 'lodash';
import API from './js/fetchCountries';
import countriesListTemplate from './templates/countriesList.hbs'
import countryCardTemplate from './templates/countriesCard.hbs'
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '../css/style.css';



const refs = {
  searchForm: document.querySelector('.js-search-form'),
  output: document.querySelector('.container'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500))


function onSearch(event) {
  refs.output.innerHTML = '';
   
  const searchQuery = event.target.value;
  if (searchQuery === "") {
    return
  }
  

  API.fetchCountriesList(searchQuery).then(data => {
    if (data.length > 10) {
      console.warn("Too many items");
      error({
        text: 'erroorrrr',
        delay: 4000,
      });
    }
    if (data.length <= 10 && data.length >= 2) {
            
      renderCountriesList(data);
      
      
    }
    if (data.length === 1) {
      renderCountryCard(data)
      // console.log("render card");
    }

   })

  
    
}

function renderCountriesList(listData) {
  refs.output.innerHTML = countriesListTemplate(listData)

}
function renderCountryCard(countryData) {
  refs.output.innerHTML = countryCardTemplate(countryData)
}
  


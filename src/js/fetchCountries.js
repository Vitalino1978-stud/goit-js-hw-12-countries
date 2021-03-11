import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';


const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountriesList(searchQuery) {
return fetch(`${BASE_URL}/name/${searchQuery}`)
  .then(result => {
    if (result.status === 404) {
      throw new Error()
    };
    return result.json()
  })
    .catch(onInvalidQuery)
  
};
function onInvalidQuery() {
  error({
    text: 'You entered invalid'
  })

};

export default { fetchCountriesList }
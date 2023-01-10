import { renderError } from "../utils/renderError.js";
import { fetchIsTodayHoliday } from "../views/viewIsTodayHoliday.js";

//creates element and adds istoday div
export async function createIsTodayHoliday(data,clone) {
    try {
      
        const divIsToday = document.getElementById('isToday');
        const h2element = document.createElement('h2');

       
        if (data.status == 200) {
            h2element.textContent = 'Today is a public holiday';

        } else {
            h2element.textContent = 'Today is not public holiday';
            h2element.style.color = 'red';
        }

        clone.addEventListener('change', fetchIsTodayHoliday)
        divIsToday.appendChild(clone);
        divIsToday.appendChild(h2element);

        //to not duplicate element
        if (divIsToday.childNodes.length > 3) {
            for (let i = 0; i < 2; i++) {
                divIsToday.removeChild(divIsToday.childNodes[3]);
            }
        }
    } catch (error) {
        renderError(error)
    }
}


/**
 * Gives alert and log errors 
 */

export function renderError(error) {
    alert(error.message);
    console.log(error);
}
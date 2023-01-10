/**
 * Bring Data from API
 */
export async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response;
    }
    throw new Error(`Error:${response.status}`);
}
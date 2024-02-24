const API_BASE_URL = 'https://swapi.dev/api/';

export const getAllStarships = async () => {
    const response = await fetch(`${API_BASE_URL}starships/`);
    if (!response.ok) {
        throw new Error ('Failed to fetch starships from SWAPI');
    }
    const data = await response.json();
    return data.results;
}
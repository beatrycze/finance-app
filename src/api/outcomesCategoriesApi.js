import BASE_URL from '../config';

const outcomesCategoriesApi = {
    get() {
        return fetch(`${BASE_URL}/categories/outcomes`)
        .then(response => response.json());
    }
}

export { outcomesCategoriesApi };

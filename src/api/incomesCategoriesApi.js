import BASE_URL from '../config';

const incomesCategoriesApi = {
    get() {
        return fetch(`${BASE_URL}/categories/incomes`)
        .then(response => response.json());
    }
}

export { incomesCategoriesApi };

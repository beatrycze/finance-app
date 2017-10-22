const BASE_URL = 'http://localhost:3000/finance';

const incomesCategoriesApi = {
    get(){
        return fetch(`${BASE_URL}/categories/incomes`).then(response => response.json());
    }
}

export {incomesCategoriesApi};

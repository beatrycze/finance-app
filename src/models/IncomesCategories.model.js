const BASE_URL = 'http://localhost:3000/finance';

const incomesCategoriesModel = {
    get(){
        return fetch(`${BASE_URL}/categories/incomes`).then(response => response.json());
    }
}

export {incomesCategoriesModel};

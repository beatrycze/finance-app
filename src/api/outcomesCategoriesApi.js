const BASE_URL = 'http://localhost:3000/finance';

const outcomesCategoriesApi = {
    get(){
        return fetch(`${BASE_URL}/categories/outcomes`).then(response => response.json());
    }
}

export {outcomesCategoriesApi};

const BASE_URL = 'http://localhost:3000/finance';

const outcomeCategoriesModel = {
    get(){
        return fetch(`${BASE_URL}/categories/outcomes`).then(response => response.json());
    }
}

export {outcomeCategoriesModel};

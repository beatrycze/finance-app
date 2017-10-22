const BASE_URL = 'http://localhost:3000/finance';

const incomesApi = {
    get(){
        return fetch(`${BASE_URL}/incomes`).then(response => response.json());
    }
}

export {incomesApi};

const BASE_URL = 'http://localhost:3000/finance';

const incomesModel = {
    get(){
        return fetch(`${BASE_URL}/incomes`).then(response => response.json());
    }
}

export {incomesModel};

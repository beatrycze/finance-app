const BASE_URL = 'http://localhost:3000/finance';

const outcomesModel = {
    get(){
        return fetch(`${BASE_URL}/outcomes`).then(response => response.json());
    }
}

export {outcomesModel};

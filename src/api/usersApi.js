const BASE_URL = 'http://localhost:3000/finance';

const usersApi = {
    get(){
        return fetch(`${BASE_URL}/users`).then(response => response.json());
    }
}

export {usersApi};

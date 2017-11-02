import BASE_URL from '../config';

const incomesApi = {
    getCollection(){
        return fetch(`${BASE_URL}/incomes`)
        .then(response => response.json());
    },
    getItem(itemId) {
        return fetch(`${BASE_URL}/incomes/${itemId}`)
        .then(response => response.json());
    },
    create(item) {
        return fetch(`${BASE_URL}/incomes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    },
    delete(id) {
        return fetch(`${BASE_URL}/incomes/${id}`, {
            method: 'delete'
        }).then(response => response.json());
    }
}

export { incomesApi };

const BASE_URL = 'http://localhost:3000/finance';

const outcomesApi = {
    getCollection(){
        return fetch(`${BASE_URL}/outcomes`).then(response => response.json());
    },
    getItem(itemId){
        return fetch(`${BASE_URL}/outcomes/${itemId}`)
        .then(response => response.json());
    },
    create(item){
        return fetch(`${BASE_URL}/outcomes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    },
}

export {outcomesApi};

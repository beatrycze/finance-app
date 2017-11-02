import BASE_URL from '../config';

const usersApi = {
    getCollection(){
        return fetch(`${BASE_URL}/users`)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => user.name = `${user.firstName} ${user.lastName}`);
            return users;
        });
    },
    getItem(userId){
        return fetch(`${BASE_URL}/users/${userId}`)
        .then(response => response.json())
        .then( user => ({...user, name: `${user.firstName} ${user.lastName}`}) );
    }
}

export { usersApi };

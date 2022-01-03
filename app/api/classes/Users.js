import { api } from '../Config';

const createUser = async (name, password) => {
    let result = await api.post(
        "/users/",
        {
            "name": name,
            "password": password
        }
    )
    return result;
}

const listUsers = async (query) => {
    let result = await api.get(
        "/users/",
        {
            "q": query
        }
    )
    return result;
}
const getUser = async (id) => {
    let result = await api.get(
        "/users/",
        ((id != undefined)?{"id": id}:{})
    )
    return result;
}

export { createUser, listUsers, getUser };
import { api } from '../Config';

const createSession = async (name, password) => {
    let result = await api.post(
        "/sessions/",
        {
            "name": name,
            "password": password
        }
    )
    return result;
}

const deleteSession = async () => {
    let result = await api.delete(
        "/sessions/"
    )
    return result;
}

const checkSession = async () => {
    let result = await api.get(
        "/sessions/",
        {},
        {
            timeout: 5000
        }
    )
    return result;
}

export { createSession, deleteSession, checkSession };
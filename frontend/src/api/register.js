import axios from 'axios';
const api_url = 'http://127.0.0.1:8000';

export async function registerCustomer(userName, phone, email, password) {
    try {
        const payload = {
            "role": "customer",
            "phone": phone,
            "email": email,
            "username": userName,
            "password": password
        }
        const res = await axios.post(`${api_url}`, payload )
        const result = res;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function registerTechnician(userName, phone, email, password) {
    try {
        const payload = {
            "role": "technician",
            "phone": phone,
            "email": email,
            "username": userName,
            "password": password
        }
        const res = await axios.post(`${api_url}`, payload )
        const result = res;
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
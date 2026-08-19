import axios from 'axios';
const api_url = 'http://127.0.0.1:8000';

export async function registerCustomer(Todo) {
    try {
        const payload = {
            data: Todo
        }
        console.log("create data",payload)
        const res = await axios.post(`${api_url}`, {data:payload})
        
        const result = res.data;
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
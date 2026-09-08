import axios from 'axios';
const api_url = 'http://localhost:8000';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withXSRFToken = true;

export async function fetchCsrfToken() {
    await axios.get(`${api_url}/csrf/`)
}

export const fetchSkills = async () => {
    try {
        const response = await axios.get(
            `${api_url}/skills/`
        );

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.log("error infetchSkill catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
};


export async function registerCustomer(userName, phone, email, password) {
    try {
        const payload = {
            "role": "customer",
            "phone": phone,
            "email": email,
            "username": userName,
            "password": password
        }
        const result = await axios.post(`${api_url}`, payload)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in register catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function registerTechnician(userName, phone, email, password,skill) {
    try {
        const payload = {
            "role": "technician",
            "phone": phone,
            "email": email,
            "username": userName,
            "password": password,
            "skill":skill
        }
        const result = await axios.post(`${api_url}`, payload)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in register catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function loginUser(userName, password) {
    try {
        const payload = {
            "username": userName,
            "password": password
        }
        const result = await axios.post(`${api_url}/login/`, payload)
        console.log("res :-->", result)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in login catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function logoutUser() {
    try {
        const result = await axios.post(`${api_url}/logout/`)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in logout catch", error.response);
        return {
            success: false,
            data: error.response
        };
    }
}

export async function hello() {
    try {
        const res = await axios.get(`${api_url}/hello/`)
        return {
            success: true,
            data: result.data
        };
    }
    catch (error) {
        console.log("error in hello catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function get_services() {
    try {
        const res = await axios.get(`${api_url}/get_services/`)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.log("error in get_services catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function get_pending_services() {
    try {
        const result = await axios.get(`${api_url}/get_pending_services/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_pending_services", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_assigned_services() {
    try {
        const result = await axios.get(`${api_url}/get_assigned_services/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_assigned_services", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_inprogress_services() {
    try {
        const result = await axios.get(`${api_url}/get_inprogress_services/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_inprogress_services", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
} export async function get_completed_services() {
    try {
        const result = await axios.get(`${api_url}/get_completed_services/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_completed_services", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}


export async function book_service(description, address, date, category, pincode) {
    try {
        const payload = {
            "description": description,
            "address": address,
            "date": date,
            "category": category,
            "pincode": pincode
        }
        const result = await axios.post(`${api_url}/book_service/`, payload)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in book_service catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function edit_service(id, description, address, date, category, pincode) {
    try {
        const payload = {
            "description": description,
            "address": address,
            "date": date,
            "category": category,
            "pincode": pincode
        }
        const result = await axios.put(`${api_url}/edit_service/${id}`, payload)
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log("error in edit_service catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}


export async function get_service(id) {
    try {
        const result = await axios.get(`${api_url}/get_service/${id}`)
        console.log("get_service result", result.data)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_service catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}

export async function delete_service(id) {
    try {
        const result = await axios.put(`${api_url}/delete_service/${id}`)
        console.log("delete_service result", result.data)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in delete_service catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}


// Technician

export async function Technician() {
    try {
        const result = await axios.get(`${api_url}/technician/`)
        return {
            success: true,
            data: result.data
        };
    }
    catch (error) {
        console.log("error in technician catch", error.response);
        return {
            success: false,
            data: error.response?.data
        };
    }
}
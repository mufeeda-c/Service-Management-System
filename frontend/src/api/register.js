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
export async function registerAdmin(userName, phone, email, password) {
    try {
        const payload = {
            "role": "admin",
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


export async function registerTechnician(userName, phone, email, password, skill) {
    try {
        const payload = {
            "role": "technician",
            "phone": phone,
            "email": email,
            "username": userName,
            "password": password,
            "skill": skill
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

export async function getAllServices() {
    try {
        const result = await axios.get(`${api_url}/getAllServices`)
        return {
            sucess: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAllServices catch", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function getAllPendingServices() {
    try {
        const result = await axios.get(`${api_url}/getAllPendingServices/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAllPendingServices Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function getAllInProgressServices() {
    try {
        const result = await axios.get(`${api_url}/getAllInProgressServices/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAllPendingServices Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function getAllCompletedServices() {
    try {
        const result = await axios.get(`${api_url}/getAllCompletedServices/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAllCompletedServices Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function getAvailableTech() {
    try {
        const result = await axios.get(`${api_url}/getAvailableTech/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAvailableTech Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function getAvailableCustomer() {
    try {
        const result = await axios.get(`${api_url}/getAvailableCustomer/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAvailableTech Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}


export async function get_service_admin(id) {
    try {
        const result = await axios.get(`${api_url}/get_service_admin/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAvailableTech Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_category_based_technician(service_id) {
    try {
        const result = await axios.get(`${api_url}/get_category_based_technician/${service_id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getCategoryBasedTechnician", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function assign_technician(id, techid) {
    try {
        const result = await axios.put(`${api_url}/assign_technician/${id}/${techid}/`)
        console.log("result in getCategoryBasedTechnician", result)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getCategoryBasedTechnician", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function cancel_request(id) {
    try {
        console.log("cancel id :", id)
        const result = await axios.put(`${api_url}/cancel_request/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getCategoryBasedTechnician", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function technician_assigned_job(id) {
    try {
        const result = await axios.get(`${api_url}/technician_assigned_job/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in technician_assigned_job", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function accept_job(id) {
    try {
        const result = await axios.put(`${api_url}/accept_job/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in accept_job", error.response)
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function getAllUsers() {
    try {
        const result = await axios.get(`${api_url}/get_all_users/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in getAllUsers Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}


export async function get_all_admins() {
    try {
        const result = await axios.get(`${api_url}/get_all_admins/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_all_admins Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_all_technician() {
    try {
        const result = await axios.get(`${api_url}/get_all_technician/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_all_technician Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function get_all_customer() {
    try {
        const result = await axios.get(`${api_url}/get_all_customer/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_all_customer Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function activate_user(id) {
    try {
        const result = await axios.put(`${api_url}/activate_user/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in activate_user Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function deactivate_user(id) {
    try {
        const result = await axios.put(`${api_url}/deactivate_user/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in deactivate_user Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_services_technician() {
    try {
        const result = await axios.get(`${api_url}/get_services_technician/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_services_technician Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}
export async function get_inprogress_services_technician() {
    try {
        const result = await axios.get(`${api_url}/get_inprogress_services_technician/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_inprogress_services_technician Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
} export async function get_completed_services_technician() {
    try {
        const result = await axios.get(`${api_url}/get_completed_services_technician/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_completed_services_technician Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function get_service_technician(id) {
    try {
        const result = await axios.get(`${api_url}/get_service_technician/${id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in get_service_technician Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
}

export async function reject_service(service_id) {
    try {
        const result = await axios.put(`${api_url}/reject_service/${service_id}/`)
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.log("error in reject service Catch ", error.response);
        return {
            success: false,
            data: error.response?.data
        }
    }
};
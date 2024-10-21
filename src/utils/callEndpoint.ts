import axios from "axios"

const callEndpoint = async (API_BASE_URL: string | any, path: string, method: string, body?: any, token?: string)  => {
    switch (method) {
        case "GET":
            return await axios.get(`${API_BASE_URL}${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
        case "POST":
            return await axios.post(`${API_BASE_URL}${path}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
        case "PATCH":
            return await axios.patch(`${API_BASE_URL}${path}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
        case "DELETE":
            return await axios.delete(`${API_BASE_URL}${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
    }
}

export default callEndpoint
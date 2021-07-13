import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
    // try {
    //     const url = `${API_URL}/user`;
    //     const params = {
    //         method : "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //     };
    //     const response = await fetch(url, params);
    //     const result = await response.json();
    //     return result;
    // } catch (error) {
    //     return null;
    // }
    const url = `${API_URL}/user`;
        const params = {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
    };
    return await fetch(url, params)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

export async function loginApi(formData) {
    try{
    const url = `${API_URL}/auth/login`;
        const params = {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
    };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
    // return await fetch(url, params)
    //     .then((respuesta) => {
    //         return respuesta.json();
    //     })
    //     .then((data) => console.log(data))
    //     .catch((error) => console.log(error))    
}
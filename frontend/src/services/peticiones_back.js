import axios from "axios";
import { BASE_URL } from "../consts/Config";

export const axios_Form_Send = async (Info) => {
    try {

    let config = {
        method: Info.method,
        maxBodyLength: Infinity,
        url: `${BASE_URL}${Info.url}`,
        headers: {  
            'Authorization': `Bearer ${Info.token}`
        },
        data : Info.data
    };
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.log(error)
        return {message : "Error al hacer la peticion", error}
    }
}

export const axios_JSON_Send = async (Info) => {
    try {
        let data = JSON.stringify(Info.data)

        let config = {
        method: Info.method,
        maxBodyLength: Infinity,
        url: `${BASE_URL}${Info.url}`,
        headers: {  
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${Info.token}`
        },
        data : data
    };
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.log(error)
        return {message : "Error al hacer la peticion", error}
    }
}

export const refresh_User = async (Token) => {
    try {

        let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/api/user/profile`,
        headers: {  
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${Token}`
        }
    };
        const response = await axios.request(config)
        return response.data.response
    } catch (error) {
        console.log(error)
        return {message : "Error al hacer la peticion", error}
    }
}
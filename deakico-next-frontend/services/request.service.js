import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "requests";
const endpoint = API_URL + entity;

const insertRequest = async (data) => {
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

const updateRequest = async (req_id, data) => {
    return await axios.put(endpoint + "/" + req_id, data, {headers: authHeader()});
};

const getAllRequests = async () => {
    return await axios.get(endpoint);
};

const getRequest = async (req_id) => {
    return await axios.get(endpoint + "/" + req_id)
}

const getProviderRequest = async () => {
    return await axios.get(endpoint + "/of/provider", {headers: authHeader()});
};

const getUserRequest = async () => {
    return await axios.get(endpoint + "/of/user", {headers: authHeader()});
}

export default {
    insertRequest,
    updateRequest, 
    getAllRequests,
    getRequest,
    getProviderRequest,
    getUserRequest,
    //delete missing
};
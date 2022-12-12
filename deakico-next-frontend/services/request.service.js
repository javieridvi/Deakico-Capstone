import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "requests";
const endpoint = API_URL + entity;

const insertRequest = async (data) => {
    console.log('request.service.js data recieved >');
    console.log(data);
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

const updateRequestByUser = async (req_id, data) => {
    return await axios.put(endpoint + "/user/" + req_id, data, {headers: authHeader()});
};

const updateRequestByProvider = async (req_id, data) => {
    return await axios.put(endpoint + "/provider/" + req_id, data, {headers: authHeader()});
};

const deleteRequest = async (req_id) => {
    return await axios.delete(endpoint + "/" + req_id, {headers: authHeader()});
}

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
    updateRequestByUser,
    updateRequestByProvider,
    deleteRequest, 
    getAllRequests,
    getRequest,
    getProviderRequest,
    getUserRequest,
};
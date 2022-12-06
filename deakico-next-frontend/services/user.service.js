import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "users";
const endpoint = API_URL + entity;

//replaced with register axios connection in auth.service.js
const insertUser = async (data) => {
    return await axios.post(endpoint, data); 
};

const updateUser = async (data) => {
    return await axios.put(endpoint, data, {headers: authHeader()});
};

const deleteUser = async () => {
    return await axios.delete(endpoint, {headers: authHeader()});
}

const getAllUsers = async () => {
    return await axios.get(endpoint);
};

const getUser = async () => {
    return await axios.get(endpoint + "/user", {headers: authHeader()})
}

export default {
    insertUser,
    updateUser, 
    deleteUser,
    getAllUsers,
    getUser,
};
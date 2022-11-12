import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "users";
const endpoint = API_URL + entity;

const insertUser = async () => {
    return await axios.post(endpoint); 
};

const updateUser = async () => {
    return await axios.put(endpoint, {headers: authHeader()});
};

const getAllUsers = async () => {
    return await axios.get(endpoint);
};

const getUser = async () => {
    return await axios.get(endpoint + "/user", {headers: authHeader()})
}

export default {
    insertUser,
    updateUser, 
    getAllUsers,
    getUser,
    //delete missing
};
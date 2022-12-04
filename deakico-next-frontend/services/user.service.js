import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "users";
const endpoint = API_URL + entity;

//replaced with register axios connection in auth.service.js
const insertUser = async (data) => {
    return await axios.post(endpoint, data); 
};

//u_id not needed in parameter. Get u_id of logged-in.
const updateUser = async (data) => {
    return await axios.put(endpoint, data, {headers: authHeader()});
};

const getAllUsers = async () => {
    return await axios.get(endpoint);
};

//u_id not needed in parameter. Get u_id of logged-in.
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
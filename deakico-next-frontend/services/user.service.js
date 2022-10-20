import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "reviews";
const endpoint = API_URL + entity;

const insertUser = async () => {
    return await axios.post(endpoint, {headers: authHeader}); 
};

const updateUser = async () => {
    return await axios.put(endpoint, {headers: authHeader});
};

const getAllUsers = async () => {
    return await axios.get(endpoint, {headers: authHeader});
};

const getUser = async (u_id) => {
    return await axios.get(endpoint + "/" + u_id, {headers: authHeader})
}

export default {
    insertUser,
    updateUser, 
    getAllUsers,
    getUser,
    //delete missing
};
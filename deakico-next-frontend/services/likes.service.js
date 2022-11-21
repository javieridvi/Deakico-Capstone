import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "likes";
const endpoint = API_URL + entity;

const insertLike = async (data) => {
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

//most likely unnecessary
// const updateLike = async (l_id, data) => {
//     return await axios.put(endpoint + "/" + l_id, data, {headers: authHeader()});
// };

const getAllLikes = async () => {
    return await axios.get(endpoint);
};

// const getLike = async (l_id) => {
//     return await axios.get(endpoint + "/" + l_id, {headers: authHeader});
// };

const getUserLiked = async () => {
    return await axios.get(endpoint + "/user", {headers: authHeader()}); //check endpoint
};

const getItemLikes = async (i_id) => {
    return await axios.get(endpoint + "/item/" + i_id); //check endpoint
};

export default {
    insertLike,
    updateLike,
    getAllLikes,
    //getLike,
    getUserLiked,
    getItemLikes,
    //delete missing
};
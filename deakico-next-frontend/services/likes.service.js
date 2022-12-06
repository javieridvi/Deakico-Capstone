import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
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


//it returns the list of items a provider has, and their corresponding like count.
const getLikesOfProvider = async () => {
    return await axios.get(endpoint + "/provider", {headers: authHeader()});
}

const getUserLiked = async () => {
    return await axios.get(endpoint + "/user", {headers: authHeader()});
};

const getItemLikes = async (i_id) => {
    return await axios.get(endpoint + "/item/" + i_id);
};

const deleteLike = async (I_id) => {
  let data = {
    i_id: I_id
};
    return await axios.delete(endpoint, {headers: authHeader(), data: data});
};

export default {
    insertLike,
    //updateLike,
    getAllLikes,
    //getLike,
    getLikesOfProvider,
    getUserLiked,
    getItemLikes,
    deleteLike,
   
};
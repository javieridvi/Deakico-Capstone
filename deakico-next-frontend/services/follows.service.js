import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "follows";
const endpoint = API_URL + entity;

const insertFollow = async () => {
    return await axios.post(endpoint, {headers: authHeader}); 
};

const updateFollow = async (f_id) => {
    return await axios.put(endpoint + "/" + f_id, {headers: authHeader})
}

const getAllFollows = async () => {
    return await axios.get(endpoint, {headers: authHeader});
};

const getFollow = async (f_id) => {
    return await axios.get(endpoint + "/" + f_id, {headers: authHeader});
};

const getFollowersCount = async () => {
    return await axios.get(endpoint+ "/followers", {headers: authHeader}); //check endpoint
};

const getFollowers = async () => {
    return await axios.get(endpoint + "/followers/user", {headers: authHeader}); //check endpoint
};

const getFollowingCount = async () => {
    return await axios.get(endpoint + "/following", {headers: authHeader}); //check endpoint
};

const getFollowing = async () => {
    return await axios.get(endpoint + "/following/provider", {headers: authHeader}); //check endpoint
}


export default {
    insertFollow,
    updateFollow,
    getAllFollows,
    getFollow,
    getFollowersCount,
    getFollowers,
    getFollowingCount,
    getFollowing,
    //delete missing
}
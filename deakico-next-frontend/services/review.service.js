import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "reviews";
const endpoint = API_URL + entity;

const insertReview = async (data) => {
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

const updateReview = async (r_id, data) => {
    return await axios.put(endpoint + "/" + r_id, data, {headers: authHeader()});
};

const getAllReviews = async () => {
    return await axios.get(endpoint);
};

const getReview = async (r_id) => {
    return await axios.get(endpoint + "/" + r_id)
}

const getItemReview = async (i_id) => {
    return await axios.get(endpoint + "/item/" + i_id);
};

const getProviderReviews = async () => {
    return await axios.get(endpoint + "/provider", {headers: authHeader()});
}

export default {
    insertReview,
    updateReview, 
    getAllReviews,
    getReview,
    getItemReview,
    getProviderReviews,
    //delete missing
};
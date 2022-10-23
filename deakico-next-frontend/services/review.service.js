import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "reviews";
const endpoint = API_URL + entity;

const insertReview = async () => {
    return await axios.post(endpoint, {headers: authHeader}); 
};

const updateReview = async (r_id) => {
    return await axios.put(endpoint + "/" + r_id, {headers: authHeader});
};

const getAllReviews = async () => {
    return await axios.get(endpoint, {headers: authHeader});
};

const getReview = async (r_id) => {
    return await axios.get(endpoint + "/" + r_id, {headers: authHeader})
}

const getItemReview = async (i_id) => {
    return await axios.get(endpoint + "/item/" + i_id, {headers: authHeader});
};


export default {
    insertReview,
    updateReview, 
    getAllReviews,
    getReview,
    getItemReview,
    //delete missing
};
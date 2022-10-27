import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "items";
const endpoint = API_URL + entity;

const insertItem = async () => {
    return await axios.post(endpoint, {headers: authHeader}); 
};

const updateItem = async (i_id) => {
    return await axios.put(endpoint + "/id/" + i_id, {headers: authHeader})
}

const getAllItems = async () => {
    return await axios.get(endpoint);
};

const getItem = async (i_id) => {
    return await axios.get(endpoint + "/id/" + i_id);
};

const getItemByType = async (i_type) => {
    return await axios.get(endpoint + "/type/" + i_type); //check endpoint
};

const getItemCategories = async () => {
    return await axios.get(endpoint+ "/category"); //check endpoint
};

const getItemByCategory = async (i_category) => {
    return await axios.get(endpoint+ "/category/" + i_category); //check endpoint
};

const getItemOfProvider = async () => {
    return await axios.get(endpoint + "/provider", {headers: authHeader}); //check endpoint
}

export default {
insertItem,
updateItem,
getItem,
getAllItems,
getItemByCategory,
getItemByType,
getItemCategories,
getItemOfProvider
//delete missing
}
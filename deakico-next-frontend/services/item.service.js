import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "items";
const endpoint = API_URL +  entity;

const insertItem = async (data) => {
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

const updateItem = async (i_id, data) => {
    return await axios.put(endpoint + "/id/" + i_id, data, {headers: authHeader()});
}

const deleteItem = async (i_id) => {
    return await axios.delete(endpoint + "/delete/" + i_id, {headers: authHeader()});
}

const getAllItems = async () => {
    return await axios.get(endpoint);
};

const getItem = async (i_id) => {
    return await axios.get(endpoint + "/id/" + i_id);
};

const getItemImageUploadUrl = async () => {
    return await axios.get(endpoint + "/image", {headers: authHeader()});
};

const putUploadItemImage = async (url, file) => {
    return await axios.put(url,file);
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

const getItemOfProvider = async (pa_id) => {
    const data = {
        pa_id: pa_id,
    }
// console.log('item.service >');
// console.log(data);
    return await axios.post(endpoint + "/provider", data); //check endpoint
}

const getItemOfProviderLiked = async (pa_id) => {
    const data = {
        pa_id: pa_id,
    }
// console.log('item.service >');
// console.log(data);
    return await axios.post(endpoint + "/provider/liked", data, {headers: authHeader()}); //check endpoint
}

export default {
insertItem,
updateItem,
deleteItem,
getItem,
getItemImageUploadUrl,
putUploadItemImage,
getAllItems,
getItemByCategory,
getItemByType,
getItemCategories,
getItemOfProvider,
getItemOfProviderLiked,
}
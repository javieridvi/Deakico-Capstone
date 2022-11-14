import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "providers";
const endpoint = API_URL + entity;

const insertProvider = async () => {
    return await axios.post(endpoint, {headers: authHeader()}); 
};

const updateProvider = async (pa_id) => {
    return await axios.put(endpoint + "/" + pa_id, {headers: authHeader()});
};

const getAllProviders = async () => {
    return await axios.get(endpoint);
};

const getProvider = async (pa_id) => {
    return await axios.get(endpoint + "/" + pa_id, {headers: authHeader()})
}

const getProviderCategory = async (pa_category) => {
    return await axios.get(endpoint + "/category/" + pa_category);
};

export default {
    insertProvider,
    updateProvider, 
    getAllProviders,
    getProvider,
    getProviderCategory,
    //delete missing
};
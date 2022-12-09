import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "providers";
const endpoint = API_URL + entity;

const insertProvider = async (data) => {
    return await axios.post(endpoint, data, 
        {headers: 
            authHeader(),
         },
    ); 
};

const updateProvider = async (data) => {
    return await axios.put(endpoint, data, {headers: authHeader()});
};

const deleteProvider = async () => {
    return await axios.delete(endpoint, {headers: authHeader()});
}

const getAllProviders = async () => {
    return await axios.get(endpoint);
};

const getAllProvidersWithFollow = async () => {
    return await axios.get(endpoint+"/follows", {headers: authHeader()});
};

const getProvider = async (pa_id) => {
    return await axios.get(endpoint + "/" + pa_id, {headers: authHeader()})
}

const getProviderProfile = async (pa_id) => {
  const data ={
    pa_id: pa_id,
  }
  console.log(data);
    return await axios.post(endpoint + "/profile", data)
}

const getProviderCategory = async (pa_category) => {
    return await axios.get(endpoint + "/category/" + pa_category);
};

export default {
    insertProvider,
    updateProvider, 
    deleteProvider,
    getAllProviders,
    getProvider,
    getProviderProfile,
    getProviderCategory,
    getAllProvidersWithFollow,
};
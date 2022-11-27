import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const entity = "follows";
const endpoint = API_URL + entity;

const insertFollow = async (data) => {
    return await axios.post(endpoint, data, {headers: authHeader()}); 
};

//Most likely unnecessary
// const updateFollow = async (f_id) => {
//     return await axios.put(endpoint + "/" + f_id, {headers: authHeader()})
// }

const getAllFollows = async () => {
    return await axios.get(endpoint);
};

// const getFollow = async (f_id) => {
//     return await axios.get(endpoint + "/" + f_id, {headers: authHeader});
// };

const getFollowersCount = async () => {
    return await axios.get(endpoint+ "/followers/count", {headers: authHeader()});
};

const getFollowers = async () => {
    return await axios.get(endpoint + "/followers", {headers: authHeader()});
};

const getFollowingCount = async () => {
    return await axios.get(endpoint + "/following/count", {headers: authHeader()});
};

const getFollowing = async () => {
    return await axios.get(endpoint + "/following", {headers: authHeader()});
}


export default {
    insertFollow,
    updateFollow,
    getAllFollows,
    //getFollow,
    getFollowersCount,
    getFollowers,
    getFollowingCount,
    getFollowing,
    //delete missing
}
import axios from "axios";
import authHeader from "./auth/auth.header";

const API_URL = process.env.API_URL;
const entity = "follows";
const endpoint = API_URL + entity;


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

const getFollowersGroupByDate = async () => {
    return await axios.get(endpoint + "/followers/group-by-date", {headers: authHeader()});
}

const getFollowingCount = async () => {
  return await axios.get(endpoint + "/following/count", {headers: authHeader()});
};

const getFollowing = async () => {
  return await axios.get(endpoint + "/following", {headers: authHeader()});
}

const insertFollow = async (paId) => {
  let data = {
    pa_id: paId
};
  return await axios.post(endpoint, data, {headers: authHeader()}); 
};

const deleteFollow = async (paId) => {
  let data = {
    pa_id: paId
};
    return await axios.delete(endpoint, {headers: authHeader(), data: data});
};

export default {
    insertFollow,
    deleteFollow,
    getAllFollows,
    //getFollow,
    getFollowersCount,
    getFollowers,
    getFollowingCount,
    getFollowing,
    getFollowersGroupByDate,
}
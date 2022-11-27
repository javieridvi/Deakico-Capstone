import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const register = async (u_firstname, u_lastname, email, username, password) => {
  return await axios.post(API_URL + "auth/register", {
    email: email,
    username: username,
    u_firstname: u_firstname , 
    u_lastname: u_lastname,
    password: password,
  });
};


const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "auth/login", {
      email: email,
      password: password,
    });
  if (response.data.token) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  sessionStorage.removeItem("user");
};

//getUser() inside user.service.js should replace this method, as it uses authHeader.
const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const isLoggedIn = () => {
  return sessionStorage.getItem("user") ? true : false;
}

// const removeAcount = (id_user,obj) => {
//   return axios.delete(API_URL + "users/"+id_user, {data:obj});
// };

// const updateAcount = (id_user,obj) => {
//   return axios.put(API_URL + "users/"+id_user, obj);
// };


export default {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  // removeAcount,
  // updateAcount,
};
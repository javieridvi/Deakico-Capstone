import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.API_URL;

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

const updatePassword = async (newPassword) => {
  const data = { password: newPassword };
  return await axios.put(API_URL + 'auth/update-password', data, {headers: authHeader()})
}


export default {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  updatePassword,
};
import authService from "./auth.service";

export default function authHeader() {
  var user = null;
  if(authService.isLoggedIn()) {
    user = JSON.parse(sessionStorage.getItem('user'));
  }
  
    if (user && user?.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      console.log("Unauthorized");
    }
  }
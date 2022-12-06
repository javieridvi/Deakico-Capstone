import authService from "./auth.service";

/**
 * This function searches the sessionStorage for the
 * logged-in user's token to then return a header object
 * to further authenticate the user in certain requests.
 * 
 * @returns the header object to be used to authenticate certain requests
 */
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
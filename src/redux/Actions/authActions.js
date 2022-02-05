import axios from "axios";
import { API } from "../../api";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, setUserLoaded } from "./helperActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// Signup
export const registerUser = (userData) => (dispatch) => {
  axios
    .post(`${API}/register`, userData, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      toast("User Registeration Successfull", { type: "success" });
    })
    .catch((err) => {
      // error message
      toast(err.response.data.message, { type: "warning" });
    });
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  console.log(userData);
  axios
    .post(`${API}/login`, userData)
    .then((res) => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(localStorage.getItem("jwtToken"));
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // login messag on succes
      toast("Logged in Successfully", { type: "success" });
      // set loading to false
      dispatch(setUserLoaded());
      // redirect to events page upon login
      history.push("/events");
    })
    .catch((err) => {
      dispatch(setUserLoaded());
      // error message
      toast("Invalid Credentials", { type: "error" });
    });
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  if (history) {
    history.push("/");
  }
  toast("Logged out Successfully", { type: "warning" });
};

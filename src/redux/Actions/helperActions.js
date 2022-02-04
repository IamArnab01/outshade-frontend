import { SET_CURRENT_USER, USER_LOADING, USER_LOADED } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// User loaded
export const setUserLoaded = () => {
  return {
    type: USER_LOADED,
  };
};

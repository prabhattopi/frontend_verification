import { useContext, useState } from "react";


import { toast } from "react-toastify";
import api from "../api.js";
import { AuthContext } from "../context/auth/AuthContext.jsx";
export const useGoogleApi = () => {
  const { dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const fetchGoogle = async (secretToken,flag="button") => {
    setLoading(true);
    try {
      const response = await api.post(`/users/google_id?credentials=${secretToken}&flag=${flag}`);
      if (response && response.status === 200) {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error(error.response.data.message, {
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: true, // Hide the progress bar
      });
    }
    setLoading(false);
  };
  return { fetchGoogle, loading };
};

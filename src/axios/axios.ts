import axios from "axios";
import { APIBASEURL, useUserAuthStore } from "../store/store";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: `${APIBASEURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      await fetch(`${APIBASEURL}/account/token/refresh`, {
        method: "POST",
        body: JSON.stringify({
          refresh: localStorage.getItem("refreshToken"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (response.status == 401) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            useUserAuthStore.setState({ user:{userId:null,userName:null,userType:null,userPic:null} })
            toast.done("Successfully logged out");
  
        }
        })
        .catch(() => {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          useUserAuthStore.setState({ user:{userId:null,userName:null,userType:null,userPic:null} })
          toast.done("Successfully logged out");

        });
    }
    return Promise.reject(error);
  }
);

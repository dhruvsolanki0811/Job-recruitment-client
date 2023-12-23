import { create } from "zustand";
import axios from "axios";
import { APIBASEURL, useJobStore } from "./store";
import { toast } from "react-toastify";
import { devtools,persist } from "zustand/middleware";
import { stringify } from "postcss";

type DevtoolsStore = {
  showDevtools: boolean;
  setShowDevtools: (showDevtools: boolean) => void;
};

interface userAuth extends DevtoolsStore {
  accessToken: string | null;
  refreshToken: string | null;
  user:{
    userId:number|null,
    userName:string|null,
    userPic:string|null,
    userType:string|null
  }
  loader: boolean;
  login: (email: string, password: string, type: string) => Promise<void>;
  logout: () => void;
}

export const useUserAuthStore = create<userAuth>()(
  devtools(persist((set) => {
    let refreshTimeout: any | null = null;

    const refreshToken = async (refreshTokenValue: string,userType:any) => {
      try {
        console.log(refreshTokenValue,"popop")
        const response = await axios.post(`http://127.0.0.1:8000/api/account/token/refresh`, {
          'refresh': refreshTokenValue,
        });
        console.log("Asasas")
        const { access, refresh } = response.data;
        
        set({ accessToken: access, refreshToken: refresh, });
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        // toast.info("Token refreshed");
      } catch (error) {
        console.error("Error refreshing token:",error);
        console.log("Asasas")
        // Handle error (e.g., logout the user)
        set({ accessToken: null, refreshToken: null ,user:{userId:null,userName:null,userPic:null,userType:null}});
        clearTimeout(refreshTimeout); // Clear the refresh timeout on logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        // Schedule the next refresh after 5 minutes
        refreshTimeout = setTimeout(() => refreshToken(refreshTokenValue,userType), 5 * 60 * 1000);
      }
    };

    return {
      loader: false,
      accessToken: null,
      refreshToken: null,
      user:{userId:null,userName:null,userPic:null,userType:null},
      showDevtools: false, // Initial value for devtools visibility
      setShowDevtools: (showDevtools) => set({ showDevtools }),
      login: async (email, password, type) => {
        try {
          set({ loader: true });
          const response = await axios.post(`${APIBASEURL}/account/${type}/login`, { email, password });

          const { access, refresh } = response.data;
          // console.log(typeof response.data.user.username);
          const currUser={
            userName:response.data.user.username,
            userId:response.data.user.id,
            userPic:response.data.user.profile_pic,
            userType:type
          }
          console.log(refresh,"pop")
          set({ accessToken: access, refreshToken: refresh, user:currUser });
          // console.log(response.data.user.username);
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          // localStorage.setItem("username", response.data.user.username);
          console.log(refresh,"SSs")
          // Schedule the next refresh after 5 minutes
          refreshTimeout = setTimeout(() => refreshToken(refresh,type), 5 *1000);
          set({ loader: false });
          toast.done("Successfully login");
        } catch (err) {
          set({ loader: false });
          console.error(err);
          if (err?.response?.data?.error) {
            toast.error(err?.response.data.error);
          } else {
            toast.error("Some server Error");
          }
        }
      },
      logout: () => {
        clearTimeout(refreshTimeout); // Clear the refresh timeout on logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        useJobStore.getState().fetchJobs()
        set({ accessToken: null, refreshToken: null,user:{userId:null,userName:null,userPic:null,userType:null} });
        toast.done("Successfully logged out");
      },
    };
  },{
    name: "user", // key under which the state will be stored
    getStorage: () => localStorage, // use localStorage as the storage engine
  }))
);

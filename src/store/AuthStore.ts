import { create } from "zustand";
import { toast } from "react-toastify";
import { devtools,persist } from "zustand/middleware";

type DevtoolsStore = {
  showDevtools: boolean;
  setShowDevtools: (showDevtools: boolean) => void;
};

interface userAuth extends DevtoolsStore {
  user:{
    userId:number|null,
    userName:string|null,
    userType:string|null
  }
  logout: () => void;
}

export const useUserAuthStore = create<userAuth>()(
  devtools(persist((set) => {
    return {
      user:{userId:null,userName:null,userPic:null,userType:null},
      showDevtools: false, // Initial value for devtools visibility
      setShowDevtools: (showDevtools) => set({ showDevtools }),
      
      logout: () => {
        //clearTimeout(refreshTimeout); // Clear the refresh timeout on logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user:{userId:null,userName:null,userType:null} });
        toast.done("Successfully logged out");
      },
    };
  },{
    name: "user", // key under which the state will be stored
    getStorage: () => localStorage, // use localStorage as the storage engine
  }))
);

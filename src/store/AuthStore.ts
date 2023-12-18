import { create } from "zustand";
import axios from "axios";
import { APIBASEURL } from "./store";

interface userAuth {
    accessToken: string | null;
    refreshToken: string | null;
  
    login: (user: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
  export const useUserAuthStore = create<userAuth>((set) => ({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: () => {},
  }));
import { create } from "zustand";
import axios from "axios";
import { APIBASEURL } from "./store";

  export interface JobSeeker {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    description: string;
    no_of_years_experience: number;
    phone_number: number;
    skills: string[];
    profile_pic: string;
  }


interface ConnectionStore {
  connections: JobSeeker[];
  status:null|string;
  fetchConnections: (type:string|null|undefined) => Promise<void|JobSeeker[]>;
  statusCheck:(target:string  )=>Promise<void>;
  sendRequets:(user1:number|null|any,user2:number|null|any)=>Promise<void>
  handleConnections:(type:string|null,id:any)=>Promise<void>
  handleReject:(userId:number|null|any)=>Promise<void>,
  loader: boolean;
}

export const useConnectionStore = create<ConnectionStore>((set) => {
  return {
    connections: [],
    loader: false,
    status: null,
    fetchConnections: async (type) => {
      try {
        set({ loader: true });
        const response = await axios.get<JobSeeker[]>(`${APIBASEURL}/connections/${type}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        set({ loader: false, connections: response.data });
        return response.data
      } catch (err) {
        set({ loader: false });
        console.error(err);
      }
    },
  statusCheck:async(target)=>{
    
    try {
      const response = await axios.get(`${APIBASEURL}/connections/status/${target}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      set({loader:false,status:response.data.connection_status})
      return response.data.connection_status 
    } catch (error) {
      console.error(error)
    }
  },
  sendRequets:async(user1,user2)=>{
    try {
      axios.post(`${APIBASEURL}/connections/create`,{ "user1":user1,
      "user2":user2},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  handleConnections:async(type,id)=>{
        try{
          axios.patch(`${APIBASEURL}/connections/${type}/${id}`,{},{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          }
        catch(error){

        }
  },
  handleReject:async(userId)=>{
    try {
      axios.delete(`${APIBASEURL}/connections/delete/${userId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  }

})
   
import { create } from "zustand";
import axios from "axios";
import { APIBASEURL } from "./store";
import { toast } from "react-toastify";

export interface Organization {
    id: number,
    username: string,
    email: string,
    location: string,
    name: string,
    website: string,
    overview: string,
    founded_at: number,
    profile_pic: string
  }
interface OrganizationFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    overview: string;
    location: string;
    founded_at: number|any;
    website: string;
    profile_pic: File | null;
}
  interface OrganizationState {
      organizationPage: Organization | null;
      organizationList: Organization[];
      fetchSingleOrganization: (id:string) => Promise<void>;
      fetchOrganizations: () => Promise<void>;
      createOrganization:(org:OrganizationFormData)=>Promise<void>
      loader:boolean
  }
  
  export const useOrganizationStore = create<OrganizationState>((set) => ({
    organizationPage: null,
      organizationList: [],
      loader:false,
      fetchSingleOrganization:async(username)=>{
        try{
          set({loader:true})
          const response = await axios.get(`${APIBASEURL}/account/organization/${username}`);
          set({loader:false})
          set({ organizationPage: response.data });
          return response.data
        }
        catch (err){
            console.log(err)
        }
      },
      fetchOrganizations:async()=>{
        try{
            set({loader:true})
            const response = await axios.get(`${APIBASEURL}/account/create/organization`);
            set({loader:false})
    
            set({ organizationList: response.data });
          }
          catch (err){
              console.log(err)
          }
      },
      createOrganization: async (data: OrganizationFormData) => {
        try {
          set({ loader: true });
      
          const formData = new FormData();
      
          // Append fields to the FormData object
          for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
              formData.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          }
      
      
          // Send the request
          const response = await axios.post(`${APIBASEURL}/account/create/organization`, formData, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
          });
      
          // Display success message
          toast.info('You are an Organization on JobCom');
      
          set({ loader: false });
        } catch (err:any) {
          set({ loader: false });
      
          // Log detailed error information
          console.error('Error in createOrganization:', err);
      
          // Display error messages more gracefully
          if (err?.response?.data?.message) {
            toast.error(err.response.data.message);
          }
          
          else {
            toast.error('An error occurred. Please check the console for details.');
            for (const [key, value] of Object.entries(err?.response?.data)) {
                toast.error(value[0])
            }
          }
        }
      },    }))
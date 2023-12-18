import { create } from "zustand";
import axios from "axios";
import { APIBASEURL } from "./store";

export interface Job {
    id: number;
    organization_name: string;
    organization_profile_pic: string;
    role: string;
    skills_required: string[];
    required_experience: number;
    employee_type: string;
    salary: number;
    job_description: string;
    created_at: string;
  }
    
  interface JobState {
      jobPage: Job | null;
      jobList: Job[];
      fetchSingleJob: (id:string) => Promise<void>;
      fetchJobs: (filters?: Record<string, string | string[]>) => Promise<void>;
      loader:boolean
  }
  
  export const useJobStore = create<JobState>((set) => ({
      jobPage: null,
      jobList: [],
      loader:false,
      fetchSingleJob:async(id)=>{
        try{
          set({loader:true})
          const response = await axios.get(`${APIBASEURL}/jobs/jobprofile/${id}`);
          set({loader:false})
  
          set({ jobPage: response.data });
        }
        catch (err){
            console.log(err)
        }
      },
      fetchJobs: async (filters = {}) => {
    set({ loader: true });
    try {
      // Convert the filters object to a URL query string
      const queryString = Object.keys(filters)
        .map((key) =>
          Array.isArray(filters[key])
            ? filters[key].map((value:any) => `${key}=${value}`).join('&')
            : `${key}=${filters[key]}`
        )
        .join('&');
      console.log(queryString)
      // Append the query string to the API endpoint
      const apiUrl = queryString
        ? `${APIBASEURL}/jobs/jobprofile?${queryString}`
        : `${APIBASEURL}/jobs/jobprofile`;

      const response = await axios.get(apiUrl);
      set({ loader: false, jobList: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ loader: false });
    }
  },
    }));
  
import { create } from 'zustand';
import { APIBASEURL, useConnectionStore } from './store';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface JobSeeker {
  id: number|null|undefined;
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

interface CreateJobSeeker {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  description: string;
  no_of_years_experience: number | string;
  phone_number: string;
  skills: string[];
  profile_pic: File | null;
  resume: File | null;
}

interface JobSeekerState {
  jobSeeker: JobSeeker | null;
  jobSeekerList: JobSeeker[];
  fetchSingleJobSeeker: (username: string) => Promise<void>;
  fetchJobseekers: () => Promise<void>;
  createUser: (data: CreateJobSeeker) => Promise<void>;
  fetchApplicants:(jobId:any)=>Promise<JobSeeker[]|void>;
  loader: boolean;
}

export const useJobSeekerState = create<JobSeekerState>((set) => ({
  jobSeeker: null,
  jobSeekerList: [],
  loader: false,
  fetchSingleJobSeeker: async (username) => {
    try {
      set({ loader: true });
      useConnectionStore.setState({status:null  })
      const response = await axios.get(`${APIBASEURL}/account/jobseeker/${username}`);
      

      set({ loader: false, jobSeeker: response.data });
    } catch (err) {
      set({ loader: false });

      console.error(err);
    }
  },
  fetchJobseekers: async () => {
    try {
      set({ loader: true });
      let response;
 
      response = await axios.get<JobSeeker[]>(`${APIBASEURL}/account/create/jobseeker`);
      
      set({ loader: false, jobSeekerList: response.data });
    } catch (err) {
      set({ loader: false });
      console.error(err);
    }
  },
  createUser: async (data) => {
    try {
      set({ loader: true });
  
      const formData = new FormData();
  
      // Append fields to the FormData object
      Object.entries(data).forEach(([key, value]) => {
       
  
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append('skills',JSON.stringify(value))
        } else {
          formData.append(key, value);
        }
      });
      
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });
      // Adjust the API endpoint based on your server requirements
      // const response = await axios.post(`http://127.0.0.1:8000/api/account/create/jobseeker`, {formData});
       await axios({
        method: 'post',
        url: `${APIBASEURL}/account/create/jobseeker`,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data`,
        },
    });
    toast.info("Welldone you are now part of Jobcom community")

      set({ loader: false });
    } catch (err) {
        set({ loader: false });
        if ((err as any)?.response || (err as any)?.response.data || (err as any)?.response.data.message) {
          // Display the error message using React Toastify
          toast.error((err as any)?.response.data.error);
        } else {
          // Display a generic error message
          for (const [_, value] of Object.entries(((err as any)?.response?.data ?? {}) as Record<string, unknown>)) {
            toast.error((value as any[])[0] as string);
          }
          toast.error('An error occurred. Please try again later.');
        }

    }
  },
  fetchApplicants:async(jobId)=>{
    try {
      set({ loader: true });
      let response;
 
      response = await axios.get<JobSeeker[]>(`${APIBASEURL}/applicants/job_applications/${jobId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      set({ loader: false });

      return response.data      
    } catch (err) {
      set({ loader: false });
      console.error(err);
    }
  }
  
}));

import { create } from 'zustand';
import { APIBASEURL, useConnectionStore } from './store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse } from 'react-router-dom';

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
  profile_picture: File | null;
  resume: File | null;
}

interface JobSeekerState {
  jobSeeker: JobSeeker | null;
  jobSeekerList: JobSeeker[];
  fetchSingleJobSeeker: (username: string) => Promise<void>;
  fetchJobseekers: () => Promise<void>;
  createUser: (data: CreateJobSeeker) => Promise<void>;
  fetchApplicants:(jobId:number|null)=>Promise<void>;
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
  
  
      // Adjust the API endpoint based on your server requirements
    //   const response = await axios.post(`${APIBASEURL}/account/create/jobseeker`, {formData});
      const response = await axios({
        method: 'post',
        url: `${APIBASEURL}/account/create/jobseeker`,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
    });
    toast.info("Welldone you are now part of Jobcom community")

      set({ loader: false });
    } catch (err) {
        set({ loader: false });
        if (err?.response || err?.response.data || err?.response.data.message) {
          // Display the error message using React Toastify
          toast.error(err?.response.data.error);
        } else {
          // Display a generic error message
          for (const [key, value] of Object.entries(err?.response?.data)) {
              toast.error(value[0])
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
      
      return response.data      
    } catch (err) {
      console.error(err);
    }
  }
  
}));

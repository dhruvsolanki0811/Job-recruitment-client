import { create } from "zustand";
import axios from "axios";
import { APIBASEURL } from "./store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      applied:boolean;
      jobList: Job[];
      loader:boolean;
      filters:Object;
      applyJob:(userId:number|null|string,jobId:undefined|number|null|string)=>Promise<void>
      fetchSingleJob: (id:string|undefined) => Promise<void>;
      fetchJobs: (applied_filters?: Record<string, string | string[]>) => Promise<void>;
      sortJob:(type:string,order:string)=>void,
      fetchAppliedJob:(username:string|null)=>Promise<void>,
      create:(data:{
        organization_id: string|number|null,
        role: string,
        required_experience: number|string,
        employee_type: string,
        salary: string|number,
        job_description: string,
        skills_required:string[]}) => Promise<void>;
      jobPostedbyOrg:(orgId:string|null)=>Promise<void>;
      }
  
  export const useJobStore = create<JobState>((set) => ({
      jobPage: null,
      jobList: [],
      loader:false,
      applied:false,
      filters:{},
      fetchSingleJob:async(id)=>{
        try{
          set({applied:false})
          set({loader:true})
          const response = await axios.get(`${APIBASEURL}/jobs/jobprofile/${id}`);
          set({loader:false})
          let token=localStorage.getItem("accessToken")
          set({ jobPage: response.data });
          if(token!=null){
            const statusResponse = await axios.get(`${APIBASEURL}/applicants/status/${id}`,{headers:{
              Authorization:`Bearer ${token}`
            }});
            set({applied:statusResponse.data.has_applied})
          }
        }
        catch (err){
          set({ loader: false });

        }
      },
      fetchJobs: async (applied_filters = {}) => {
    set({ loader: true });
    try {
      // Convert the filters object to a URL query string
      useJobStore.setState({filters:{
        ...useJobStore.getState().filters,
        ...applied_filters
      }})
      
      const queryString = Object.keys(useJobStore.getState().filters)
        .map((key) =>
          Array.isArray(useJobStore.getState().filters[key])
            ? useJobStore.getState().filters[key].map((value:any) => `${key}=${value}`).join('&')
            : `${key}=${useJobStore.getState().filters[key]}`
        )
        .join('&');
      // Append the query string to the API endpoint
      const apiUrl = queryString
        ? `${APIBASEURL}/jobs/jobprofile?${queryString}`
        : `${APIBASEURL}/jobs/jobprofile`;
        let response;
      if(localStorage.getItem("accessToken")!=null){
       response = await axios.get(apiUrl,{headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
      }});
    }
      else{
         response = await axios.get(apiUrl)
      }
      set({ loader: false, jobList: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ loader: false });
    }
  },
  sortJob: (type,order) => {
    
    set((state) => ({
      ...state,
      jobList: [...state.jobList].sort((a, b) => {
        if(type==='salary'){
          
        return order === 'asc' ? (a.salary - b.salary) :( b.salary - a.salary);
        }else {
          return order === 'des'? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        
      }),
    }));
  },
  create:async(data)=>{
    try {
      set({loader:true})
      const accessToken=localStorage.getItem('accessToken')

      const response = await axios.post(`${APIBASEURL}/jobs/jobprofile`, data,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Other headers if needed
        }});
      // Handle the response as needed, for example:
       // You may want to return some data from the response
       
       set({loader:false})
       return response.data.id
    } catch (err) {
      // Handle errors, for example:

      console.error('Error creating:', err);
      set({ loader: false });
      console.error(err);
      if (err?.response?.data?.error) {
        toast.error(err?.response.data.error);
      } else {
        toast.error("Some server Error");
      }
    }
  },
  fetchAppliedJob:async(username)=>{
    set({ loader: true });
    try {
      // Convert the filters object to a URL query string
      
      // Append the query string to the API endpoint
      const apiUrl =  `${APIBASEURL}/applicants/user_applied_jobs/${username}`;

      const response = await axios.get(apiUrl,{headers:{
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }});
      set({ loader: false, jobList: response.data });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ loader: false });
    } 
  },
  jobPostedbyOrg:async (orgName:string|null)=>{
    
    try{
    set({loader:true})
      const response = await axios.get(`${APIBASEURL}/account/organization/${orgName}`);
      set((state) => ({
        ...state,
        jobList: state?.jobList.filter((job) => job.organization_name=== response.data.name),
      })) ;  
      set({loader:false})
    }
    catch(err){
      console.log(err)
      set({loader:false})
    }

  },
  applyJob:async(userId,jobId)=>{
     try{
      const response=axios.post(`${APIBASEURL}/applicants/application`,{
        "status": "pending",
      "job_profile": jobId,
      "job_seeker": userId
      },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      toast.done("SuccessFully Applied")
     }
     catch (err){
      toast.done("Not Applied")
        console.log(err)
    }
  }
    }));
  
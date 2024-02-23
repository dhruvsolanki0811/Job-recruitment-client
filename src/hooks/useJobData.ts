import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIBASEURL, useUserAuthStore } from "../store/store";
import { Job } from "../types/types";
import { useFilterStore } from "../store/FilterStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useFetchAllJobs = () => {
  const fetchAllJobs = async (): Promise<Job[]> => {
    let apiUrl = `${APIBASEURL}/jobs/jobprofile`;

    const response = await axios.get(`${apiUrl}`);
    return response.data;
  };

  return useQuery("all-jobs", fetchAllJobs);
};

export const useFetchOrganizationJobs = (organization_name: string) => {
  const fetchOrganizationJobs = async (): Promise<Job[]> => {
    let apiUrl = `${APIBASEURL}/jobs/jobprofile?organization__username=${organization_name}`;

    const response = await axios.get(`${apiUrl}`);
    return response.data;
  };

  return useQuery(
    ["organization-jobs", organization_name],
    fetchOrganizationJobs
  );
};

export const useFetchFilteredJobs = () => {
  const { filters, setfilteredJobs } = useFilterStore();
  const fetchfilteredJobs = async (): Promise<Job[]> => {
    const queryString = Object.keys(filters)
      .map((key) => {
        const filterValue = filters[key as keyof typeof filters];

        if (Array.isArray(filterValue)) {
          return filterValue.map((value: any) => `${key}=${value}`).join("&");
        } else {
          return `${key}=${filterValue}`;
        }
      })
      .join("&");
    // Append the query string to the API endpoint
    const apiUrl = queryString
      ? `${APIBASEURL}/jobs/jobprofile?${queryString}`
      : `${APIBASEURL}/jobs/jobprofile`;
    const response = await axios.get(apiUrl);
    return response.data;
  };

  return useQuery(["fetch-filtered", filters], fetchfilteredJobs, {
    onSuccess: (data) => {
      setfilteredJobs(data);
    },
  });
};

export const useFetchSingleJob = (jobId: string) => {
  const fetchSingleJob = async (): Promise<Job> => {
    const response = await axios.get(`${APIBASEURL}/jobs/jobprofile/${jobId}`);
    return response.data;
  };
  return useQuery(["Single-job", jobId], fetchSingleJob);
};

export const useFetchAppliedJob = (username: string) => {
  const fetchAppliedJob = async (): Promise<Job[]> => {
    const apiUrl = `${APIBASEURL}/applicants/user_applied_jobs/${username}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };
  return useQuery(["fetchapplied-job"], fetchAppliedJob);
};

export const useFetchStatusOfApplication = (id: string, userName: string) => {
  const fetchStatusOfApplication = async () => {
    let token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${APIBASEURL}/applicants/status/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    return response.data
  };
  return useQuery(["hasApplied", id, userName], fetchStatusOfApplication);
};


interface JobData{
  organization_id: string | number | null;
  role: string;
  required_experience: string | number;
  employee_type: string;
  salary: string | number;
  job_description: string;
  skills_required: string[];
}

export const useCreateJob=()=>{
  const {filters}=useFilterStore()
  const navigate=useNavigate()
  const createJob=async(data:JobData)=>{
    const accessToken=localStorage.getItem('accessToken')

      const response = await axios.post(`${APIBASEURL}/jobs/jobprofile`, data,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Other headers if needed
        }});
        return response.data
  }
  const queryClient= useQueryClient()
  return useMutation(createJob,{
    onSuccess:async(data)=>{
      queryClient.invalidateQueries(["fetch-filtered", filters])
      navigate(`/job/${data.id}`)     
    }
  })
}

export const useApplyJob=(jobId:string)=>{
  const {user}=useUserAuthStore()
  const applyJob=async(jobId:string)=>{
    axios.post(`${APIBASEURL}/applicants/application`,{
      "status": "pending",
    "job_profile": jobId,
    "job_seeker": user.userId
    },{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }
  const queryClient= useQueryClient()
  return useMutation(applyJob,{
    onSuccess:async()=>{
      await queryClient.invalidateQueries(["hasApplied", jobId, user.userName])
      toast.done("SuccessFully Applied")
    }
  })
}


import axios from 'axios'
import { useQuery } from 'react-query'
import { APIBASEURL } from '../store/store'
import {  JobSeeker } from '../types/types'
import { axiosInstance } from '../axios/axios'


const fetchAllJobseeker = async ():Promise<JobSeeker[]>  => {
    const response= await axios.get(`${APIBASEURL}/account/create/jobseeker`)
    return response.data
  }
  
  export const useFetchAllJobseeker = ()=> {
    return useQuery('all-jobseeker', fetchAllJobseeker)
  }

  export const useFetchSingleJobSeeker=(JobSeeker:string)=>{
    const fetchSingleJobSeeker = async (): Promise<JobSeeker> => {
  
      const response = await axios.get(
        `${APIBASEURL}/account/jobseeker/${JobSeeker}`
      );
      return response.data
      
    };
    return useQuery(['Single-jobseeker',JobSeeker],fetchSingleJobSeeker)
  }



export const useFetchJobApplicantsForSingleJob=(jobId:string)=>{
  const fetchJobApplicantsForSingleJob=async()=>{
    const response = await axiosInstance.get<JobSeeker[]>(
      `/applicants/job_applications/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data
  }
  return useQuery(["job-applicants",jobId],fetchJobApplicantsForSingleJob)
}
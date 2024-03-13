import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIBASEURL, useUserAuthStore } from "../store/store";
import { Project } from "../types/types";
import { toast } from "react-toastify";
import { axiosInstance } from "../axios/axios";

export const useFetchProjectByUser = (userId: string) => {
  const fetchProjectByUser = async () => {
    const response = await axios.get<Project[]>(
      `${APIBASEURL}/projects/user/${userId}`
    );
    return response.data;
  };
  return useQuery([userId, "Projects"], fetchProjectByUser);
};

export const useAddProject = () => {
  const { user } = useUserAuthStore();
  const addProject = (data: {
    name: string;
    deployedLink: string;
    description: string;
    skills: string[];
    project_pic: File | null;
  }) => {
    const formData = new FormData();

    // Append fields to the FormData object
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        if (value != null) {
          formData.append(key, value);
        }
      } else {
        if (value != null) {
          formData.append(key, value);
        }
      }
    }
    
    formData.append("job_seeker",user.userId?String(user.userId):"")
    return axiosInstance.post(`${APIBASEURL}/projects/`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };
  const queryClient = useQueryClient();

  return useMutation(addProject, {
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Projects"]);
      toast.success("Project Added!");
    },
  });
};


export const useDeleteProject=()=>{
  const {user}= useUserAuthStore()
  const deleteProject=(id:string)=>{
      return axiosInstance.delete(`${APIBASEURL}/projects/${id}`,{ headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },})
  }
  const queryClient = useQueryClient();

  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Projects"]);
      toast.success("Project Deleted!");
    },
  });
}


export const useUpdateProject=()=>{
  const {user}=useUserAuthStore()
  const updateProject=(data:{
    id:string;
    name: string;
    deployed_link: string;
    description: string;
    tech_stack: string[];
    })=>{
        return axiosInstance.patch(`${APIBASEURL}/projects/${data.id}`,data,{ headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }})
  }
  const queryClient = useQueryClient();

  return useMutation(updateProject,{
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Projects"]);
      toast.success("Project Updated!");
    },
  })
}
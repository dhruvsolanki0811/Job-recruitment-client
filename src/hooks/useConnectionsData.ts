import { useMutation, useQuery, useQueryClient } from "react-query";
import {  useUserAuthStore } from "../store/store";
import {  JobSeeker } from "../types/types";
import { axiosInstance } from "../axios/axios";

export const useFetchUsersConnections = (type: string, userName: string) => {
  const fetchUsersConnections = async () => {
    const response = 
    await axiosInstance.get<JobSeeker[]>
    // await axios.get<JobSeeker[]>
    (
      `/connections/${type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  };
  return useQuery(["user-connections", type, userName], fetchUsersConnections);
};

export const useFetchConnectionStatus = (
  username: string,
  targetUser: string
) => {
  const {user}=useUserAuthStore()
  const fetchConnectionStatus = async () => {
    if(user.userName){
    const response = await axiosInstance.get(
      `/connections/status/${targetUser}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
    }else{
      return { data: null, isLoading: false, isFetching: false }
    }
  };
  return useQuery(
    ["status-connection", username, targetUser],
    fetchConnectionStatus
  );
};

export const useHandleRejection = (userId: string) => {
 const{user}= useUserAuthStore()
  const removeConnection = async (targetUser: string) => {
    console.log(targetUser)
    const response = await axiosInstance.delete(
      `/connections/delete/${targetUser}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  };
  const queryClient = useQueryClient();
  return useMutation(removeConnection,{
    onSuccess:async()=>{
      queryClient.invalidateQueries(["status-connection", user.userName, userId])
      queryClient.invalidateQueries(["user-connections", 'connections', userId])
      queryClient.invalidateQueries(["user-connections", 'received', userId])
    }
  }
  )
  
};

export const useHandleConnection = (userId: string) => {
  const addConnection = async (id:string) => {
    const response = await axiosInstance.patch(`/connections/accept/${id}`,{},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data;
  };
  const queryClient = useQueryClient();
  return useMutation(addConnection,{
      onSuccess:async()=>{
        queryClient.invalidateQueries(["user-connections", 'connections', userId]) 
        queryClient.invalidateQueries(["user-connections", 'received', userId]) 
      }
    })
  
  
};

export const useCreateConnection=(user2:string,user2Name:string)=>{
  const {user}=useUserAuthStore()
  const createConnection=async()=>{
    const response =await axiosInstance.post(`/connections/create`,{ "user1":user.userId,
      "user2":user2},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      return response.data
  }
  const queryClient = useQueryClient();

  return useMutation(createConnection,{
    onSuccess:async()=>{
      queryClient.invalidateQueries(["status-connection", user.userName, user2Name])
      queryClient.invalidateQueries(["user-connections", 'connections', user.userName]) 
      queryClient.invalidateQueries(["user-connections", 'received', user.userName]) 
    }
  })
}
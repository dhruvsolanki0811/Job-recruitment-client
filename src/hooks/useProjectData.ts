import axios from "axios"
import { useQuery } from "react-query"
import { APIBASEURL } from "../store/store";
import { Project } from "../types/types";

export const useFetchProjectByUser=(userId:string)=>{
    const fetchProjectByUser=async()=>{
        const response= await axios.get<Project[]>(`${APIBASEURL}/projects/user/${userId}`)
        return response.data
    }
    return useQuery([userId,"Projects"],fetchProjectByUser)
}
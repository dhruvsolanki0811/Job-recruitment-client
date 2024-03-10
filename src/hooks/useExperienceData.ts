import axios from "axios"
import { useQuery } from "react-query"
import { APIBASEURL } from "../store/store";
import { Experience } from "../types/types";

export const useFetchExperienceByUser=(userId:string)=>{
    const fetchExperienceByUser=async()=>{
        const response= await axios.get<Experience[]>(`${APIBASEURL}/experience/user/${userId}`)
        return response.data
    }
    return useQuery([userId,"Experience"],fetchExperienceByUser)
}
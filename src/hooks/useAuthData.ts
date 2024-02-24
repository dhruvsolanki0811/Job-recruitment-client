import axios from "axios";
import { APIBASEURL, useUserAuthStore } from "../store/store";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export const useLoginHook=()=>{
    const signin=async(data:{email:string,password:string,type:string})=>{
        const response = await axios.post(`${APIBASEURL}/account/${data.type}/login`, { email:data.email,password: data.password });
        const { access, refresh } = response.data;
        const currUser={
            userName:response.data.user.username,
            userId:response.data.user.id,
            userPic:response.data.user.profile_pic,
            userType:data.type
        }
        useUserAuthStore.setState({user:currUser})
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

    }   
    return useMutation(signin,{
        onSuccess:()=>{
            toast.done("Successfully login");
        },
        onError:(err)=>{
            if ((err as any)?.response?.data?.error) {
                toast.error((err as any)?.response.data.error);
              } else {
                toast.error("Some server Error");
              }
        }
    })
}
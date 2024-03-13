import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIBASEURL, useUserAuthStore } from "../store/store";
import { Experience } from "../types/types";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-toastify";

export const useFetchExperienceByUser = (userId: string) => {
  const fetchExperienceByUser = async () => {
    const response = await axios.get<Experience[]>(
      `${APIBASEURL}/experience/user/${userId}`
    );
    return response.data;
  };
  return useQuery([userId, "Experience"], fetchExperienceByUser);
};

export const useAddExperience = () => {
  const { user } = useUserAuthStore();
  const addExperience = (data: {
    role: string;
    company: string;
    start_month: string;
    start_year: string;
    end_month?: string;
    end_year?: string;
  }) => {
    if (data.end_month?.length === 0) {
      delete data.end_month;
    }
    if (data.end_year?.length === 0) {
      delete data.end_year;
    }
    const postData = { ...data, job_seeker: user.userId };
    return axiosInstance.post(`${APIBASEURL}/experience/`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };
  const queryClient = useQueryClient();

  return useMutation(addExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Experience"]);
      toast.success("Experience Added!");
    },
  });
};

export const useDeleteExperience = () => {
  const { user } = useUserAuthStore();
  const deleteExperience = (id: string) => {
    return axiosInstance.delete(`${APIBASEURL}/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };
  const queryClient = useQueryClient();

  return useMutation(deleteExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Experience"]);
      toast.success("Experience Deleted!");
    },
  });
};

export const useUpdateExperience = () => {
  const { user } = useUserAuthStore();
  const updateExperience = (data: {
    id: string;
    role: string;
    company: string;
    start_month: string;
    start_year: string;
    end_month?: string|null;
    end_year?: string|null;
  }) => {
    if (data.end_month?.length === 0) {
        data.end_month=null;
      }
      if (data.end_year?.length === 0) {
        data.end_year=null;
      }
    return axiosInstance.patch(`${APIBASEURL}/experience/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };
  const queryClient = useQueryClient();

  return useMutation(updateExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries([user.userName, "Experience"]);
      toast.success("Experience Updated!");
    },
  });
};

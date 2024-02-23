import axios from "axios";
import { useQuery } from "react-query";
import { APIBASEURL } from "../store/store";
import { Organization } from "../types/types";

const fetchAllOrganizations = async (): Promise<Organization[]> => {
  const response = await axios.get(`${APIBASEURL}/account/create/organization`);
  return response.data;
};

export const useFetchAllOrganizations = () => {
  return useQuery("all-organizations", fetchAllOrganizations);
};


export const useFetchSingleOrganization=(organizationName:string)=>{
  const fetchSingleOrganizations = async (): Promise<Organization> => {

      const response = await axios.get(`${APIBASEURL}/account/organization/${organizationName}`);
      return response.data
    
  };
  return useQuery(['Single-organization',organizationName],fetchSingleOrganizations)
}
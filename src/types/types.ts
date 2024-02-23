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

  export interface JobSeeker {
    id: number | null | undefined;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    description: string;
    no_of_years_experience: number;
    phone_number: number;
    skills: string[];
    profile_pic: string;
  }

  
export interface Organization {
    id: number,
    username: string,
    email: string,
    location: string,
    name: string,
    website: string,
    overview: string,
    founded_at: number,
    profile_pic: string
  }

export interface Filter{
    search?:string
    required_experience__lte?: number;
    salary__lte?: number;
    role?:string
}
export interface ConnectionStatus{
  connection_status:string
}
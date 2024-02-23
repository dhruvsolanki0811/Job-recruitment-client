import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import orgPlaceHolder from "../../assets/placeholder-organization.png";
import { formatTimestampToDDMonthYYYY } from "../../utils.ts/dateutils";
import { useFetchOrganizationJobs } from "../../hooks/useJobData";

function OrganizationJobPosted() {

    const {user}=useUserAuthStore()
    const orgName=user.userName?user.userName:""
    const{data:jobList,isLoading:loader}=useFetchOrganizationJobs(orgName)
  const navigate = useNavigate();
  
  return (
    <>
      <>
        <div className="main-wrapper">
          <Sidebar></Sidebar>
          <div className="content-wrapper flex flex-col ">
            <div className="nav-section">
              <JobNav jobtype={{type:"Applied",name:"Jobs you have posted "}}></JobNav>
              <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
                <div
                  onClick={() => navigate("/")}
                  className="jobtype-container  cursor-pointer primary-text flex justify-center"
                >
                  Jobs
                </div>
                <div
                  onClick={() => navigate("/jobposted")}
                  className="jobtype-container all-section cursor-pointer primary-text flex justify-center"
                >
                  {'Job Posted'}
                </div>
              </div>
            </div>
            {loader?
            <Loader></Loader>:<div className="job-list flex flex-col ">
              {jobList&&jobList.map((job) => (
                 <>
                 <div  className="card-container w-full h-20 flex pt-2 pb-2 justify-between cursor-pointer">
                   <div onClick={()=>navigate(`/job/${job.id}`)}    className="org-logo w-20 h-full flex justify-center items-center p-2 overflow-hidden  ">
                     {(job.organization_profile_pic!=null)?
                     <img
                     src={"https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/"+job.organization_profile_pic}
                     className="h-10 w-12 rounded-full object-contain"
                     alt=""
                   />:<img
                       src={orgPlaceHolder}
                       className="h-10 w-12 rounded-full object-contain"
                       alt=""
                     />}
                   </div>
                   <div className="job-desc flex flex-col h-full gap-[1px]">
                     
                     <div className="title-sec flex text-xs gap-1 items-center ">
                       <div className="title ">{job.role}</div>
                       <div className="org-name w- text-xs color-lgt-grey word-wrap-overflow w-24">at {job.organization_name}</div>
                     </div>
                     <div className="about-job flex text-[11px] font-thin  gap-2 color-lgt-grey word-wrap-overflow">
                       {job.employee_type} • ₹{job.salary}Lpa • {job.required_experience}Y experience • posted {formatTimestampToDDMonthYYYY(job.created_at)} 

                     </div>
                     <div className="job-skills mt-2 flex items-center w-full gap-[9px] text-black">
                       {(job.skills_required.length<3?job.skills_required:job.skills_required.slice(0,3)).map((skill) => {
                         return (
                           <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                             {skill}
                           </div>
                         );
                       })}
           
                       {(job.skills_required.length>3) && <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                         {job.skills_required.length-3}
                       </div>}
                     </div>
                   </div>
                   
                <div onClick={()=>{navigate(`/applicantslist/${job.id}`)}}className="job-bookmark flex h-full justify-center items-center me-2">
                    <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid hover:border-black  cursor-pointer">
                    See Applicants
                    </div>
                </div>
                 </div>
               </>
              ))}
            </div>}
          </div>
          <FavSection page="Company"></FavSection>
        </div>
        <BottomBar></BottomBar>
      </>
    </>
  );
}

export { OrganizationJobPosted };

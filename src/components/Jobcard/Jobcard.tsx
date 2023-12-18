import "./Jobcard.css";
import orgPlaceHolder from "../../assets/placeholder-organization.png";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
 import {Job} from "../../store/JobStore"
import { formatTimestampToDDMonthYYYY } from "../../utils.ts/dateutils";
function Jobcard({job}:{job:Job}) {
const navigate=useNavigate()
  return (
    <>
      <div onClick={()=>navigate(`/job/${job.id}`)} className="card-container w-full h-20 flex pt-2 pb-2 justify-between cursor-pointer">
        <div className="org-logo w-20 h-full flex justify-center items-center p-2 overflow-hidden  ">
          {(job.organization_profile_pic!=null)?
          <img
          src={"http://127.0.0.1:8000/media/"+job.organization_profile_pic}
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
            <div className="org-name w- text-xs color-lgt-grey word-wrap-overflow w-24">at {job.organization_name.toLocaleUpperCase()}</div>
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
        
        <div className="job-bookmark flex h-full justify-center items-center">
          {/* <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-white bg-[#22C55E] hover:bg-[#13883e] text-white cursor-pointer">
            Apply
          </div> */}
        </div>
      </div>
    </>
  );
}

export { Jobcard };

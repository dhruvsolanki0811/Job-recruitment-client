import "./Jobcard.css";
import orgPlaceHolder from "../../assets/placeholder-organization.png";
import { useNavigate } from "react-router-dom";
import { Job } from "../../types/types" ;
import { formatTimestampToDDMonthYYYY } from "../../utils/dateutils";
import DevIcon from "../Devicon/Devicon";
function Jobcard({ job }: { job: Job }) {
  const navigate = useNavigate();
  
  return (
  
  <>
      <div
        onClick={() => navigate(`/job/${job.id}`)}
        className="card-container w-full min-h-[6rem] mt-2 flex flex-nowrap pt-2 pb-2 ps-1 pe-1  cursor-pointer border-b-[1px] border-b-solid border-b-[#22C55E] "
      >
        <div className="org-logo  h-full flex justify-center items-center  ">
         <div className="logo-container h-[50px] w-[50px] overflow-hidden ">
          {job.organization_profile_pic != null ? (
            <img
              src={
                `https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/${job.organization_profile_pic}`
              }
              className="h-full w-full rounded-full fill"
              alt=""
            />
          ) : (
            <img
              src={`${orgPlaceHolder}`}
              className="h-full w-full rounded-full fill"
              alt=""
            />
          )}
          </div>
        </div>
        <div className="flex flex-col h-full gap-[1px] ps-2">
          <div className="title-sec flex text-[14px] gap-1 items-center word-wrap-overflow">
            <div className="title ">{job.role}</div>
            <div className="org-name w- text-[14px] color-lgt-grey word-wrap-overflow w-24">
              at {job.organization_name}
            </div>
          </div>
          <div className="about-job flex text-[13px] font-thin  gap-2 color-lgt-grey word-wrap-overflow ">
            {job.employee_type} • ₹{job.salary}Lpa • {job.required_experience}Y
            experience • posted {formatTimestampToDDMonthYYYY(job.created_at)}
            
          </div>
          <div className="job-skills mt-2 flex items-center w-full gap-[9px] text-black">
            {(job.skills_required.length < 3
              ? job.skills_required
              : job.skills_required.slice(0, 3)
            ).map((skill,i) => {
              return (
                <div key={i } className="skills flex gap-1 items-center text-[12px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                  <DevIcon skillName={skill}></DevIcon>
                  {skill}
                </div>
              );
            })}

            {job.skills_required.length > 3 && (
              <div className="skills text-[13px]  pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
              +{job.skills_required.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Jobcard };

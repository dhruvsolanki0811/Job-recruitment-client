import "./Jobcard.css";
import orgPlaceHolder from "../../assets/placeholder-organization.png";
import { IoBookmarkOutline } from "react-icons/io5";

function Jobcard() {
  return (
    <>
      <div className="card-container w-full h-20 flex pt-2 pb-2 justify-between">
        <div className="org-logo w-20 h-full flex justify-center items-center p-2 overflow-hidden  ">
          <img
            src={orgPlaceHolder}
            className="h-10 w-12 rounded-full object-contain"
            alt=""
          />
        </div>
        <div className="job-desc flex flex-col h-full gap-[1px]">
          <div className="title-sec flex text-xs gap-1 items-center">
            <div className="title ">Senior Frontend dev </div>
            <div className="org-name text-xs color-lgt-grey ">at Linkedin</div>
          </div>
          <div className="about-job flex text-[11px] font-thin  gap-2 color-lgt-grey">
            Full-time • ₹20L • 5Y experience • posted about 20hr ago
          </div>
          <div className="job-skills mt-2 flex items-center w-full gap-[9px] text-black">
            {["Java", "Python", "JavaScript"].map((skill) => {
              return (
                <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                  {skill}
                </div>
              );
            })}
            <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
              +2
            </div>
          </div>
        </div>
        <div className="job-bookmark flex h-full justify-center items-center">
          <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black cursor-pointer">
            Apply
          </div>
        </div>
      </div>
    </>
  );
}

export { Jobcard };

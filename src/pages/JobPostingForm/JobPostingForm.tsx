import React, { ChangeEvent, useState } from "react";
import { FavSection, Sidebar, JobNav, Loader } from "../../components/components";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import { useCreateJob } from "../../hooks/useJobData";
import DevIcon from "../../components/Devicon/Devicon";

function JobPostingForm() {
  const { user } = useUserAuthStore();
  const { mutate: create,isLoading:PostLoading } = useCreateJob();
  const [jobDetails, setJobDetails] = useState({
    role: "",
    description: "",
    experience: "",
    type: "",
    salary: "",
    skills: [],
  });

  const [inputListValue, setListValue] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleListInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputListValue.trim() !== "") {
      setJobDetails((prevDetails: any) => ({
        ...prevDetails,
        skills: [inputListValue, ...prevDetails.skills],
      }));
      setListValue("");
    }
  };

  const handleDelete = (index: number) => {
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      skills: prevDetails.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Log the form details (you can replace this with your submission logic)
    create({
      organization_id: user.userId,
      role: jobDetails.role,
      job_description: jobDetails.description,
      required_experience: jobDetails.experience,
      employee_type: jobDetails.type,
      salary: jobDetails.salary,
      skills_required: jobDetails.skills,
    });
    // .then((id)=>{navigate(`/job/${id}`)})
  };

  return (
    <>
      <div className="main-wrapper">
        <Sidebar />
        <div className="content-wrapper flex flex-col">
          <div className="nav-section">
            <JobNav jobtype={{ name: "Post a Job", type: "Login" }}></JobNav>
          </div>
          <div className="box-signin w-full scrollable-content mb-[3.9rem]   flex flex-col mt-5">
            <div className="login-container flex flex-col items-center h-full">
              <div className="login-box border-[0px] flex flex-col items-center w-full  px-[4rem] max-sm:px-5">
                <div className="slider-login flex justify-between w-full">
                  <div className="header-org flex justify-center items-center cursor-pointer ">
                  Fill the Details of the Job Opportunity.
                  </div>
                </div>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={jobDetails.role}
                  onChange={handleInputChange}
                  className="w-full text-[14px] h-8 border-[2px] p-2 rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={jobDetails.description}
                  onChange={handleInputChange}
                  className="w-full text-[14px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="No of years experience"
                  value={jobDetails.experience}
                  onChange={handleInputChange}
                  className="w-full text-[14px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type (e.g., Full Time)"
                  value={jobDetails.type}
                  onChange={handleInputChange}
                  className="w-full text-[14px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="number"
                  name="salary"
                  placeholder="Salary (in lpa, e.g., 5)"
                  value={jobDetails.salary}
                  onChange={handleInputChange}
                  className="w-full text-[14px] h-8 border-[2px] p-2 rounded"
                />
                <div className="flex w-full gap-3 flex-wrap">
                  {jobDetails.skills.map((skill, index) => (
                    <div
                      className="flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white"
                      key={index}
                    >
                      <DevIcon skillName={skill}></DevIcon>
                      {skill}
                      <div
                        className="cancel-button cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        x
                      </div>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={inputListValue}
                    onChange={handleListInputChange}
                    onKeyDown={handleEnter}
                    placeholder="Add Skills"
                    className="w-full text-[14px] h-8 border-[2px] p-2 rounded"
                  />
                </div>
                <div className="login-btn-wrapper">
                  {PostLoading?
                  <Loader message=""/>
                  :<button
                    className="submit-btn text-[15px] hover:bg-[#13883e]"
                    onClick={handleSubmit}
                  >
                    Post the Job
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      <FavSection page="Connections" />
      </div>
      <BottomBar />
    </>
  );
}

export { JobPostingForm };

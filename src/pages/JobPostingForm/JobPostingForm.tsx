import React, { ChangeEvent, useState } from "react";
import { FavSection, Sidebar } from "../../components/components";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useJobStore, useUserAuthStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

function JobPostingForm() {
  const {user}=useUserAuthStore()
  const navigate=useNavigate()
  const {create}=useJobStore()
  const [jobDetails, setJobDetails] = useState({
    role: "",
    description: "",
    experience: "",
    type: "",
    salary: "",
    skills: [],
  });

  const [inputListValue, setListValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (e.key ==='Enter' && inputListValue.trim() !== "") {
      setJobDetails((prevDetails:any) => ({
        ...prevDetails,
        skills: [inputListValue, ...prevDetails.skills.slice(0, 14)],
      }))
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
      organization_id:user.userId,
      role:jobDetails.role,
      job_description:jobDetails.description,
      required_experience:jobDetails.experience,
      employee_type:jobDetails.type,
      salary:jobDetails.salary,
      skills_required:jobDetails.skills
    }).then((id)=>{navigate(`/job/${id}`)})
  };

  return (
    <>
      <div className="main-wrapper">
        <Sidebar />
        <div className="box-signin content-wrapper flex flex-col">
          <div className="nav-section mt-6">
            <div className="login-container flex flex-col items-center h-full">
              <div className="login-box flex flex-col items-center w-[25rem]">
                <div className="slider-login flex justify-between w-full">
                  <div className="header-org flex justify-center items-center cursor-pointer ">
                    Fill the required Job Details
                  </div>
                </div>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={jobDetails.role}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={jobDetails.description}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="No of years experience"
                  value={jobDetails.experience}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type (e.g., Full Time)"
                  value={jobDetails.type}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="number"
                  name="salary"
                  placeholder="Salary (in lpa, e.g., 5)"
                  value={jobDetails.salary}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <div className="flex w-full gap-3 flex-wrap">
                  {jobDetails.skills.map((skill, index) => (
                    <div className="flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white" key={index}>
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
                    placeholder="only up to 15 Skills"
                    className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                  />
                </div>
                <div className="login-btn-wrapper">
                  <button className="submit-btn text-xs hover:bg-[#13883e]" onClick={handleSubmit}>
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FavSection page="Company" />
      </div>
      <BottomBar />
    </>
  );
}

export { JobPostingForm };

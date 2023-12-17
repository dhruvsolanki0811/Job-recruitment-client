import {
  FavSection,
  JobNav,
  Jobcard,
  Sidebar,
} from "../../components/components";
import "./AllJobPage.css";
import { useNavigate } from "react-router-dom";

function AllJobPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype="All Jobs"></JobNav>
            <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
              <div
                onClick={() => navigate("/")}
                className="jobtype-container cursor-pointer all-section primary-text flex justify-center"
              >
                Jobs
              </div>
              <div
                onClick={() => navigate("/applied")}
                className="jobtype-container cursor-pointer primary-text flex justify-center"
              >
                Applied
              </div>
            </div>
          </div>
          <div className="job-list flex flex-col ">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
              <Jobcard job={{ id: id }}></Jobcard>
            ))}
          </div>
        </div>
        <FavSection page="All Job"></FavSection>
      </div>
    </>
  );
}

export { AllJobPage };

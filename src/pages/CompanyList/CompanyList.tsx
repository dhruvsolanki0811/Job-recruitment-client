import React from "react";
import "./CompanyList.css";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import placeHolder from "../../assets/placeholder-organization.png";
function CompanyList() {
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype="Company"></JobNav>
          <div className="people-grid flex p-3  w-full ">
            {[2, 3, 4, 5, 7, 8, 9, 2.2, 23, 2, 32].map(() => (
              <>
                <div className="people-box flex flex-col  ps-3">
                  <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                    <img
                      className=" object-cover  h-8 "
                      src={placeHolder}
                    ></img>
                  </div>
                  <div className="people-username text-xs mt-1">Linkedin</div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                    First-year undergrad at Indian Institute of Informationz
                    Technology Technology.
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
    </>
  );
}

export { CompanyList };

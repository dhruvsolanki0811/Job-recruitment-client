import React, { useEffect } from "react";
import "./CompanyList.css";
import { FavSection, JobNav, Loader, Sidebar } from "../../components/components";
import placeHolder from "../../assets/placeholder-organization.png";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useOrganizationStore } from "../../store/OrganizationStore";
import { useUserAuthStore } from "../../store/store";

function CompanyList() {
  const { organizationList, fetchOrganizations,loader } = useOrganizationStore();
  const { user } = useUserAuthStore();
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{ type: "Company", name: "Company" }}></JobNav>
          {loader ?
          <Loader></Loader>
          :<div className="people-grid flex p-3  w-full ">
            {organizationList
              .filter((i) => {
                return user.userName == null
                  ? true
                  : i.username != user.userName;
              })
              .map((organization) => (
                <>
                  <div
                    onClick={() => {
                      navigate(`${organization.username.toString()}`);
                    }}
                    className="people-box cursor-pointer flex flex-col  ps-3"
                  >
                    <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img
                        className=" object-cover  h-8 "
                        src={
                          organization.profile_pic == null
                            ? placeHolder
                            : organization.profile_pic
                        }
                      ></img>
                    </div>
                    <div className="people-username text-xs mt-1">
                      {organization.name}
                    </div>
                    <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                      {organization.overview}
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
  );
}

export { CompanyList };

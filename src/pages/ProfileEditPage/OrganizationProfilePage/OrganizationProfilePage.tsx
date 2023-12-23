import React, { useEffect } from 'react';
import { BottomBar, FavSection, JobNav, Sidebar } from '../../../components/components';
import { useOrganizationStore, useUserAuthStore } from '../../../store/store';
import unknown from "../../../assets/placeholder-organization.png";
import { CiMail } from 'react-icons/ci';

function OrganizationProfilePage() {
  const { organizationPage, fetchSingleOrganization } = useOrganizationStore();
  const { user, accessToken } = useUserAuthStore();

  useEffect(() => {
    if (user.userName != null && accessToken != null) {
      fetchSingleOrganization(user.userName); // Assuming accessToken is the correct parameter
    }
  }, [user.userName]);
  

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{ type: "Company Description", name: "Linkedin" }}></JobNav>
          <div className="people-grid flex flex-col p-3 w-full ">
            <div className="intro-sec flex flex-col w-full justify-center mt-5x items-center">
              <img
                src={organizationPage?.profile_pic == null ? unknown : organizationPage.profile_pic}
                className="rounded-full h-[5rem] w-[5rem] object-contain"
              />
              <div className="header-username font-medium">
                {organizationPage?.name}
              </div>
              <div className="header-username font-medium text-xs mt-2">
                {organizationPage?.location}
              </div>

              <div className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                {organizationPage?.website}
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                Established in {organizationPage?.founded_at}
              </div>
            </div>
            <div className="about-sec flex flex-col justify-center mt-2 items-center">
              <div className="header-about text-xs">
                About {organizationPage?.name}
              </div>
              <div className="header-about-txt text-xs text-grey-100 text-justify ps-10 pe-10 pt-5 ">
                {organizationPage?.overview}
              </div>
            </div>
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { OrganizationProfilePage };

import {
  BottomBar,
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../../components/components";
import { useUserAuthStore } from "../../../store/store";
import unknown from "../../../assets/placeholder-organization.png";
import { CiMail } from "react-icons/ci";
import { useFetchSingleOrganization } from "../../../hooks/useOrganizationData";

function OrganizationProfilePage() {
  const { user } = useUserAuthStore();
  const userName = user.userName ? user.userName : "";
  const { data: organizationPage, isLoading: loader } =
    useFetchSingleOrganization(userName);

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{
                type: "Company Description",
                name: organizationPage?.name ? organizationPage.name : "",
              }}
            ></JobNav>
          </div>
          {loader ? (
            <Loader></Loader>
          ) : (
            <div className="people-grid scrollable-content mb-[3.9rem]  flex  p-3 w-full ">
              <div className="intro-sec flex flex-col w-full justify-center mt-5 items-center border-b-[1px] border-b-solid border-b-[#e1e4e8]">
                <img
                  src={
                    organizationPage?.profile_pic == null
                      ? unknown
                      : organizationPage.profile_pic
                  }
                  className="rounded-full h-[5rem] w-[5rem] object-contain"
                />
                <div className="header-username font-medium">
                  {organizationPage?.name}
                </div>
                <div className="header-username font-medium text-[14px] mt-2">
                  {organizationPage?.location}
                </div>

                <div className="header-email text-[14px] mt-3 flex items-center gap-1 justify-center">
                  <CiMail />
                  {organizationPage?.website}
                </div>
                <div className="header-email text-[14px] color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                  Established in {organizationPage?.founded_at}
                </div>
              </div>
              <div className="about-sec flex flex-col justify-center mt-2 items-center border-b-[1px] border-b-solid border-b-[#e1e4e8]">
                <div className="header-about text-[14px]">
                  About {organizationPage?.name}
                </div>
                <div className="header-about-txt text-[13px] text-grey-100 text-justify ps-7 pe-7 py-4 ">
                  {organizationPage?.overview}
                </div>
              </div>
            </div>
          )}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { OrganizationProfilePage };

import "./CompanyList.css";
import { FavSection, JobNav, Loader, Sidebar } from "../../components/components";
import placeHolder from "../../assets/placeholder-organization.png";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import { useFetchAllOrganizations } from "../../hooks/useOrganizationData";

function CompanyList() {
  const { user } = useUserAuthStore();
  const{data:organizations,isLoading:orgLoader}=useFetchAllOrganizations()
 

  const navigate = useNavigate();
  return (
    <>
      <div className="main-wrapper ">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">

          <JobNav jobtype={{ type: "Company", name: "Company" }}></JobNav>
          </div>
          {orgLoader ?
          <Loader></Loader>
          :organizations?(<div className="people-grid scrollable-content flex ps-3 pe-3 pt-3 p w-full  ">
            {organizations
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
                    <div className="profile-pic  flex flex-between items-center h-[3rem] w-[3rem] mt-2 overflow-hidden border-[1px] rounded-full">
                      <img
                        className=" object-fill  h-full w-full"
                        src={
                          organization.profile_pic == null
                            ? placeHolder
                            : organization.profile_pic
                        }
                      ></img>
                    </div>
                    <div className="org-username text-[14px] mt-1">
                        {organization.name} @{organization.username} 
                    </div>
                    <div className="org-desc text-[13px] mt-1 color-lgt-grey">
                    {organization.location} 
                    </div>
                    
                    <div className=" color-lgt-grey w-full text-[11px] pe-4 text-three-line mt-1">
                      {organization.overview}
                    </div>
                  </div>
                </>
              ))}
          </div>):<></>}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { CompanyList };

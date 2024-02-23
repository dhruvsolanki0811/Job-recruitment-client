import { FavSection, JobNav, Loader, Sidebar } from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useFetchUsersConnections, useHandleConnection, useHandleRejection } from "../../hooks/useConnectionsData";
import { useUserAuthStore } from "../../store/AuthStore";

function FollowersList() {
  let { page } = useParams();
  const {user}=useUserAuthStore()
  const userName=user.userName?user.userName:""
  const{mutate:handleConnections,isLoading:handleConnectionLoading}=useHandleConnection(userName)
  const {mutate:handleReject ,isLoading:handleRejectionLoading}= useHandleRejection(userName)
  const pageType=page?page:""
  const {data:connections,isLoading:loader,isFetching}=useFetchUsersConnections(pageType,userName)
  

  const navigate = useNavigate();

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{ type: "Connections", name: "Connections" }}
            ></JobNav>
            <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
              <div
                onClick={() => navigate("/connections/connections")}
                className={`jobtype-container cursor-pointer ${
                  page == "connections" && "all-section"
                } primary-text flex justify-center`}
              >
                Connections
              </div>
              {/* <div
                  onClick={() => navigate("/connections/pending")}
                  className={`jobtype-container cursor-pointer primary-text flex justify-center ${page=='pending'&&"all-section"}`} 
                >
                  Pending Requests
                </div> */}
              <div
                onClick={() => navigate("/connections/received")}
                className={`jobtype-container cursor-pointer  primary-text flex justify-center ${
                  page == "received" && "all-section"
                }`}
              >
                Connections Requests
              </div>
            </div>
          </div>
          {loader || isFetching ||handleConnectionLoading||handleRejectionLoading?
          <Loader></Loader>
          :<div className="people-grid flex p-3  w-full ">
            {connections && connections.map((user:any) => (
              <>
                <div className="people-box flex flex-col  ps-3 pe-3">
                  <div className="follow-container flex justify-between items-center">
                    <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img
                        className=" object-cover  h-8 "
                        src={
                          user?.profile_pic == null
                            ? placeHolder
                            : user?.profile_pic
                        }
                      ></img>
                    </div>
                    <div className="flex gap-3 items-center">
                      {page == "connections" && (
                        <div
                          onClick={() => {
                            
                            handleReject(user.id)
                          }}
                          className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-red-500 hover:text-white cursor-pointer"
                        >
                          Connected
                        </div>
                      )}
                      {/* {page=="pending"&& <>
                   <div onClick={()=>{
                      handleReject(user.id)
                      setTrigger(!trigger)
                    }}
                    className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-[#22C55E] hover:text-white  hover:bg-red-500 hover:text-white cursor-pointer" >{
                      ("Cancel")
                    }</div> </>} */}
                      {page === "received" && (
                        <>
                          <div
                            onClick={async () => {
                              // await handleConnections("accept", user.id).then(
                              //   () => {
                              //     setTrigger(!trigger);
                              //   }
                              // );
                              handleConnections(user.id)
                            }}
                            className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-[#22C55E] hover:text-white cursor-pointer"
                          >
                            {"Accept"}
                          </div>
                          <div
                            onClick={ () => {                                
                                handleReject(user.id)
                              }}
                            className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-red-500 hover:text-white cursor-pointer"
                          >
                            {"Reject"}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="people-username text-xs mt-1">
                    {user.username}
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                    {user.description}
                  </div>
                </div>
              </>
            ))}
          </div>}
        </div>
        <FavSection page="Connections"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { FollowersList };

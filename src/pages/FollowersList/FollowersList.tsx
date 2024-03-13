import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import {
  useFetchUsersConnections,
  useHandleConnection,
  useHandleRejection,
} from "../../hooks/useConnectionsData";
import { useUserAuthStore } from "../../store/AuthStore";

function FollowersList() {
  let { page } = useParams();
  const { user } = useUserAuthStore();
  const userName = user.userName ? user.userName : "";
  const { mutate: handleConnections, isLoading: handleConnectionLoading } =
    useHandleConnection(userName);
  const { mutate: handleReject, isLoading: handleRejectionLoading } =
    useHandleRejection(userName);
  const pageType = page ? page : "";
  const {
    data: connections,
    isLoading: loader
  } = useFetchUsersConnections(pageType, userName);

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
            <div className="section-jobtype w-full h-9 ps-5 pe-5 flex  ">
              <div
                onClick={() => navigate("/connections/connections")}
                className={`jobtype-container cursor-pointer ${
                  page == "connections" && "all-section"
                } primary-text flex justify-center items-center h-full`}
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
                className={`jobtype-container cursor-pointer  primary-text flex justify-center items-center h-full ${
                  page == "received" && "all-section"
                }`}
              >
                Connections Requests
              </div>
            </div>
          </div>
          {loader || handleConnectionLoading || handleRejectionLoading ? (
            <Loader></Loader>
          ) : (
            <div className="people-grid scrollable-content max-sm:mb-[3.9rem]  flex p-3  w-full ">
              {connections &&
                connections.map((user: any,key) => (
                  <div key={key}>
                    <div className="people-box flex flex-col  ps-3 pe-3">
                      <div className="follow-container flex gap-3 items-center">
                        <div className="profile-pic flex justify-center items-center  h-[2.8rem] w-[3rem] mt-2 overflow-hidden border-[1px] rounded-full">
                          {user?.profile_pic == null 
                          ? (
                            <img
                              className=" object-  h-[70%] w-[70%]  "
                              src={placeHolder}
                            ></img>
                          ) : (
                            <img
                              className=" object-fill  h-full w-full"
                              src={user?.profile_pic}
                            ></img>
                          )}
                        </div>
                        <div className="flex gap-3 items-center">
                          {page == "connections" && (
                            <div
                              onClick={() => {
                                handleReject(user.id);
                              }}
                              className="follow-btn text-[12px] font-medium ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-red-500 hover:text-white cursor-pointer"
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
                                  handleConnections(user.id);
                                }}
                                className="follow-btn text-[12px] font-medium ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-[#22C55E] hover:text-white cursor-pointer"
                              >
                                {"Accept"}
                              </div>
                              <div
                                onClick={() => {
                                  handleReject(user.id);
                                }}
                                className="follow-btn text-[12px] font-medium ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-red-500 hover:text-white cursor-pointer"
                              >
                                {"Reject"}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="people-username text-[14px] font-medium mt-1 flex gap-2">
                        {user.firstname}{user.lastname} {" "} @{user.username}
                      </div>
                      <div className="text-three-line color-lgt-grey w-full text-[11px] pe-4 mb-1">
                        {user.description}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <FavSection page="Connections"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { FollowersList };

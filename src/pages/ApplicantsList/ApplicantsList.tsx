import React, { useEffect, useState } from "react";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useConnectionStore } from "../../store/ConnectionStore";
import { useJobSeekerState } from "../../store/JobSeekerStore";
import { useJobStore } from "../../store/JobStore";

function ApplicantsList() {
  let {jobId}=useParams()
  const[connections,setConnections]=useState(new Array())
  const[trigger,setTrigger]=useState(false)
    const {fetchSingleJob,jobPage}=useJobStore()
//   const {}=useConnectionStore()
const {fetchApplicants} =useJobSeekerState()
  useEffect(()=>{
    if(jobId!=null){
        fetchSingleJob(jobId)
    fetchApplicants(jobId).then((response)=>{
      setConnections(response)
    })
    }
    
  },[jobId,trigger])
  
  const navigate = useNavigate();
 
  

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{type:"Applied",name:`Applicant for ${jobPage?.role} at ${jobPage?.organization_name}`}}></JobNav>
            
          </div>
          <div className="people-grid flex p-3  w-full ">
            { connections?.map((user) => (
              <>
                <div onClick={()=>{navigate(`/users/${user.username}`)}} className="people-box flex flex-col  ps-3 pe-3">
                  <div className="follow-container flex justify-between items-center">
                    <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img
                        className=" object-cover  h-8 "
                        src={user.profile_pic==null?placeHolder:`http://127.0.0.1:8000/${user.profile_pic}`}
                      ></img>
                    </div>
                    <div className="flex gap-3 items-center">

                    
                    {/* {page=="pending"&& <>
                   <div onClick={()=>{
                      handleReject(user.id)
                      setTrigger(!trigger)
                    }}
                    className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black hover:bg-[#22C55E] hover:text-white  hover:bg-red-500 hover:text-white cursor-pointer" >{
                      ("Cancel")
                    }</div> </>} */}
                    
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
          </div>
        </div>
        <FavSection page="Connections"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { ApplicantsList };

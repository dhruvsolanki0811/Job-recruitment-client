import axios from "axios";
import DevIcon from "../../components/Devicon/Devicon";
import {
  BottomBar,
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import { useFetchSingleJobSeeker } from "../../hooks/useJobseekerData";
import { useUserAuthStore } from "../../store/AuthStore";
// import unknown from "../../assets/unknown.png";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { APIBASEURL } from "../../store/store";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../axios/axios";
import Loading from "react-loading";
import { TbEdit } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";

interface SeekerFormData {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  no_of_years_experience: number | string;
  phone_number: string;
  skills: string[];
}

function UserProfileUpdateForm() {
  const { user } = useUserAuthStore();
  const [inputListValue, setListValue] = useState<string>("");

  const { data: currUser, isLoading: loader } = useFetchSingleJobSeeker(
    user.userName ? user.userName : ""
  );
  const queryClient = useQueryClient();
  const { mutate: updateDetail, isLoading } = useMutation(
    async (data: SeekerFormData) => {
      axiosInstance.patch(
        `${APIBASEURL}/account/jobseeker/${user.userName ? user.userName : ""}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "Single-jobseeker",
          user.userName ? user.userName : "",
        ]);
        toast.success("Updated Successfully");
      },
    }
  );

  const [formData, setFormData] = useState<SeekerFormData>({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    no_of_years_experience: 0,
    phone_number: "",
    skills: [],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleListInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);
  };
  const handleEnter = (e: any) => {
    if (e.keyCode === 13 && inputListValue.trim() !== "") {
      // Update the list with a new item, and limit to 15 elements
      e.preventDefault(); // Prevent the default form submission behavior

      setFormData((prev) => {
        const updatedList = [inputListValue, ...prev.skills];
        setListValue(""); // Clear the input field after adding the item
        return { ...prev, skills: updatedList };
      });
    }
  };
  const handleDelete = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    setFormData({
      firstname: currUser?.firstname || "",
      lastname: currUser?.lastname || "",
      email: currUser?.email || "",
      description: currUser?.description || "",
      no_of_years_experience: currUser?.no_of_years_experience || 0,
      phone_number: String(currUser?.phone_number) || "",
      skills: currUser?.skills || [],
    });
  }, [currUser]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevent
    // if (!formData.profile_pic || !formData.resume) {
    //   toast.error("Please upload both a profile picture and a resume.");
    //   return;
    // }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }
    console.log(formData);
    updateDetail(formData);
  };

  //Image operation

  const { mutate: updateProfilePicture, isLoading: profilePicLoading } =
    useMutation(
      async (data: File) => {
        const formData = new FormData();
        formData.append("profile_pic", data);
        axiosInstance.patch(
          `${APIBASEURL}/account/jobseeker/${
            user.userName ? user.userName : ""
          }`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries([
            "Single-jobseeker",
            user.userName ? user.userName : "",
          ]);
          setChangedProfilePic(null);
          toast.success("Updated Successfully");
          console.log(currUser);
          queryClient.refetchQueries([
            "Single-jobseeker",
            user.userName ? user.userName : "",
          ]);
        },
      }
    );

  const [changedProfilePic, setChangedProfilePic] = useState<File | null>();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setChangedProfilePic(file);
    } else {
      toast.error("Please select an image file.");
      event.target.value = ""; // Clear the input field
    }
    console.log(changedProfilePic);
  };
  const handleRemoveImage = () => {
    // Clear the selected image and preview
    setChangedProfilePic(null);
    let imageInput = document.getElementById("imageInput");
    if (imageInput) {
      imageInput.nodeValue = "";
    }
  };
  const handleProfilePicUpdate = () => {
    if (changedProfilePic) updateProfilePicture(changedProfilePic);
  };

  //Resume operation

  const { mutate: updateResume, isLoading: resumeLoading } = useMutation(
    async (data: File) => {
      const formData = new FormData();
      formData.append("resume", data);
      axiosInstance.patch(
        `${APIBASEURL}/account/jobseeker/${user.userName ? user.userName : ""}`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "Single-jobseeker",
          user.userName ? user.userName : "",
        ]);
        setChangedResume(null);
        toast.success("Updated Successfully");
        console.log(currUser);
        queryClient.refetchQueries([
          "Single-jobseeker",
          user.userName ? user.userName : "",
        ]);
      },
    }
  );

  const [changedResume, setChangedResume] = useState<File | null>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setChangedResume(file);
    } else {
      toast.error("Please select a PDF file.");
      event.target.value = ""; // Clear the input field
    }
    console.log(changedResume);
  };
  const handleRemoveResume = () => {
    // Clear the selected image and preview
    setChangedResume(null);
    let resumeInput = document.getElementById("fileInput");
    if (resumeInput) {
      resumeInput.nodeValue = null;
    }
  };
  const handleResumeUpdate = () => {
    if (changedResume) updateResume(changedResume);
  };
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>

        <div className="box-signin content-wrapper flex flex-col ">
          <div className="nav-section  ">
            <JobNav
              jobtype={{ type: "User Signin", name: "Edit Your Profile" }}
            ></JobNav>
          </div>

          {loader && !currUser ? (
            <Loader message=""></Loader>
          ) : (
            <div className="scrollable-content max-sm:mb-[3.9rem]  overflow-hidden  flex flex-col  items-center w-full ">
              <div className="flex flex-col w-full py-3  border-b-[1px] border-b-[lgt-grey]  border-b-solid border-t-[1px] border-t-[lgt-grey]  border-t-solid  mt-4 gap-2 justify-center items-center">
                <div className="header text-[14px] ">
                  Edit The Profile Pic here
                </div>
                <div className="flex ">
                  {profilePicLoading ? (
                    <Loader message=""></Loader>
                  ) : !changedProfilePic ? (
                    currUser ? (
                      <img
                        src={currUser.profile_pic}
                        className=" border-grey flex items-center justify-center border-[0.2px] border-solid h-[5rem] w-[5rem] "
                      />
                    ) : (
                      <div className="border-grey flex items-center justify-center text-[14px] border-[0.2px] border-solid h-[5rem] w-[5rem] ">
                        Choose a Picture to update
                      </div>
                    )
                  ) : (
                    <>
                      {" "}
                      <img
                        src={URL.createObjectURL(changedProfilePic)}
                        className="border-grey flex items-center justify-center text-[14px] border-[0.2px] border-solid h-[5rem] w-[5rem] "
                      />
                      <span
                        onClick={handleRemoveImage}
                        className="  px-1 py-1
                                       text-lg
                                      text-red-500

                                      border-none
                                      rounded
                                      cursor-pointer
                    "
                      >
                        x
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <div className="flex flex-col justify-start items-center">
                  {changedProfilePic ? (
                    <div
                      onClick={handleProfilePicUpdate}
                      className="save-btn flex items-center text-[13px] text-[white] bg-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-[13px]   border-none rounded cursor-pointer select-none inline-block mt-2"
                    >
                      Click to save profile pic
                    </div>
                  ) : (
                    <label
                      htmlFor="imageInput"
                      className="flex items-center text-[13px] text-[white] bg-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-[13px]   border-none rounded cursor-pointer select-none inline-block mt-2"
                    >
                      Choose a profile picture
                    </label>
                  )}
                </div>
              </div>
              <div className="flex w-full py-3  border-b-[1px] border-b-[lgt-grey]  border-b-solid border-t-[1px] border-t-[lgt-grey]  border-t-solid   items-center justify-center flex-col">
                {currUser?.resume && (
                  <div className="flex items-center gap-2">
                    <div className="text-[14px]">Your Existing Resume:</div>
                    <a
                      href={currUser.resume}
                      download={
                        currUser.resume.replace(
                          "https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/media/resumes",
                          ""
                        ) + ".pdf"
                      }
                      className="flex cursor-pointer items-center border-[1px] px-2 py-1 rounded-full border-solid border-[lgt-grey]"
                    >
                      <FaRegFilePdf className=" text-[red] text-[20px]" />
                    </a>
                  </div>
                )}

                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center text-[13px] text-[#22C55E]">
                  {resumeLoading ? (
                    <Loader message=""></Loader>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="mt-2">
                        Selected file:{" "}
                        {changedResume ? changedResume.name : "None"}
                      </div>
                      {changedResume && (
                        <div
                          onClick={handleRemoveResume}
                          className="cursor-pointer text-[red] cursor-pointer "
                        >
                          X
                        </div>
                      )}
                    </div>
                  )}

                  {changedResume ? (
                    <div
                      onClick={handleResumeUpdate}
                      className=" h-8 text-[13px] text-white bg-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-[13px]   border-none rounded cursor-pointer select-none inline-block mt-4"
                    >
                      {" "}
                      Click to save resume
                    </div>
                  ) : (
                    <label
                      htmlFor="fileInput"
                      className=" h-8 text-[13px] text-white bg-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-[13px]   border-none rounded cursor-pointer select-none inline-block mt-4"
                    >
                      Click to updated your resume
                    </label>
                  )}
                  {/* <div className="optional text-[13px] text-[#a4a8ae]">
                    Optional
                  </div> */}
                </div>
              </div>

              <form
                method="POST"
                onSubmit={handleSubmit}
                className=" p-[1rem] px-[2rem]   flex gap-[1rem] mt-3 mb-3 flex-col items-center justify-center w-full  "
              >
                <div className="header text-[14px] ">Edit The details here</div>{" "}
                <div className="name-input flex w-full gap-2">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    required
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    required
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                  />
                </div>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                />
                <textarea
                  name="description"
                  required
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                  type="number"
                  name="no_of_years_experience"
                  required
                  placeholder="No of year of Experience"
                  value={formData.no_of_years_experience}
                  min={0}
                  max={50}
                  onChange={handleInputChange}
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                />
                <input
                  type="tel"
                  name="phone_number"
                  required
                  placeholder="Phone No"
                  maxLength={10}
                  min={10}
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded "
                />
                <div className="flex w-full gap-3 flex-wrap">
                  {formData.skills.map((skill, index) => (
                    <div
                      className="flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white"
                      key={index}
                    >
                      <DevIcon skillName={skill}></DevIcon>
                      {skill}
                      <div
                        className="cancel-button cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        x
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  name="skills"
                  value={inputListValue}
                  onChange={handleListInputChange}
                  onKeyDown={handleEnter}
                  placeholder="Add Skills"
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                />
                <div className="login-btn-wrapper ">
                  {isLoading ? (
                    <>
                      <Loader message=""></Loader>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="submit-btn text-[13px] hover:bg-[#13883e]  "
                    >
                      SignUp
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export default UserProfileUpdateForm;

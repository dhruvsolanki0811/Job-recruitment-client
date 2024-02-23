import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  JobNav,
  Sidebar,
  BottomBar,
  Loader,
} from "../../../../components/components";
import unknown from "../../../../assets/placeholder-organization.png";
import { APIBASEURL } from "../../../../store/store";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

interface OrganizationSigninProps {}

interface OrganizationFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  overview: string;
  location: string;
  founded_at: number | string;
  website: string;
  profile_pic: File | null;
}
const addOrganization = async (data: OrganizationFormData) => {
  const formData = new FormData();

  // Append fields to the FormData object
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      if (value != null) {
        formData.append(key, value);
      }
    } else {
      if (value != null) {
        formData.append(key, value);
      }
    }
  }

  // Send the request
  await axios.post(`${APIBASEURL}/account/create/organization`, formData, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });

  // Display success message
};
function OrganizationSignin({}: OrganizationSigninProps) {
  const queryClient=useQueryClient()
  const {mutate:createOrganization,isLoading:loader}=useMutation(addOrganization,{
    onSuccess:async()=>{
      toast.info('You are an Organization on JobCom');
      queryClient.invalidateQueries("all-organizations")
    }
  })
  const [formState, setFormState] = useState<OrganizationFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    overview: "",
    location: "",
    founded_at: "",
    website: "",
    profile_pic: null,
  });
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFormState((prevState) => ({
        ...prevState,
        profile_pic: file,
      }));

      const previewUrl = URL.createObjectURL(file);
      setSelectedImagePreview(previewUrl);
    } else {
      toast.error("Please select an image file.");
      event.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setFormState((prevState) => ({
      ...prevState,
      profile_pic: null,
    }));
    setSelectedImagePreview(null);
    let imageInput = document.getElementById("imageInput") as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    // Add your form submission logic here
    // Validation
    if (!formState.name.trim()) {
      toast.error("Name is required");
      return;
    }
    // if (formState.profile_pic === null) {
    //   toast.error("Profile pic is required");
    //   return;
    // }
    if (!formState.username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (!formState.email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!isValidEmail(formState.email)) {
      toast.error("Invalid email format");
      return;
    }
    // Add more validations as needed

    createOrganization(formState);
    // toast.success('Organization signed up successfully!');
    setFormState({
      name: "",
      username: "",
      email: "",
      password: "",
      overview: "",
      location: "",
      founded_at: "",
      website: "",
      profile_pic: null,
    });
    setSelectedImagePreview(null);
  };

  const isValidEmail = (email: string) => {
    // Add your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="box-signin content-wrapper flex flex-col ">
          <div className="nav-section mt-6">
            <JobNav
              jobtype={{ type: "User Signin", name: "Organization Signin" }}
            ></JobNav>
            <div className="login-container flex flex-col items-center h-full ms-[2.8rem] me-[2rem]">
              <div className=" flex flex-col items-center w-[25rem] ">
                <div className="slider-login flex justify-between w-full">
                  <div
                    className={`header-org flex justify-center items-center cursor-pointer `}
                  >
                    Fill the below form to create a JobCom Profile
                  </div>
                </div>
                {loader ? (
                  <Loader></Loader>
                ) : (
                  <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="login-box flex flex-col items-center w-[25rem] "
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Name of the Organization"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="Grab a unique username for your Company !"
                      value={formState.username}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formState.password}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <textarea
                      name="overview"
                      placeholder="Overview about your Company"
                      value={formState.overview}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formState.location}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <input
                      type="number"
                      name="founded_at"
                      placeholder="Enter the year of foundation"
                      min="1900"
                      max="2100"
                      value={formState.founded_at}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                    />
                    <input
                      name="website"
                      placeholder="Website"
                      // type="url"
                      value={formState.website}
                      onChange={handleInputChange}
                      className="w-full text-[12px] h-8 border-[2px] p-2 rounded "
                    />
                    {/* Image upload section */}
                    <div className="flex flex gap-2 justify-center items-center">
                      <div className="flex ">
                        {selectedImagePreview === null ? (
                          <img
                            src={unknown}
                            className="rounded-full border-grey border-[0.2px] border-solid h-20 w-20 object-contain"
                          />
                        ) : (
                          <>
                            {" "}
                            <img
                              src={selectedImagePreview?.toString()}
                              className="rounded-full h-20 w-20 object-contain"
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
                      <div className="flex flex-col justify-center items-center">
                        <label
                          htmlFor="imageInput"
                          className=" h-8 text-xs text-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-xs   border-none rounded cursor-pointer select-none inline-block mt-4"
                        >
                          Choose a profile picture
                        </label>
                        <div className="optional text-xs text-[#a4a8ae]">
                          Optional
                        </div>
                      </div>
                    </div>
                    {/* Submit button */}
                    <div className="login-btn-wrapper ">
                      <button
                        type="submit"
                        className="submit-btn text-xs hover:bg-[#13883e]"
                      >
                        SignUp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { OrganizationSignin };

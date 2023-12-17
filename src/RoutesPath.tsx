import { Route, Routes } from "react-router-dom";
import {
  AllJobPage,
  AppliedJob,
  AuthLogin,
  CompanyDescription,
  CompanyList,
  FollowersList,
  FollowingList,
  JobDescriptionPage,
  JobPostingForm,
  OrganizationSignin,
  UserDescriptionPage,
  UserList,
  UserSignin,
} from "./pages/pages";

function RoutesPath() {
  return (
    <Routes>
      <Route path="/" element={<AllJobPage></AllJobPage>} />
      <Route path="/applied" element={<AppliedJob></AppliedJob>} />
      <Route path="/users" element={<UserList></UserList>} />
      <Route path="/company" element={<CompanyList></CompanyList>} />
      <Route path="/followers" element={<FollowersList></FollowersList>} />
      <Route path="/following" element={<FollowingList></FollowingList>} />
      <Route path="/login" element={<AuthLogin></AuthLogin>} />
      <Route path="/signup/user" element={<UserSignin></UserSignin>} />
      <Route path="/signup/organization" element={<OrganizationSignin></OrganizationSignin>} />
      <Route path="/organization/jobposting" element={<JobPostingForm></JobPostingForm>} />
      <Route path="/job/:id" element={<JobDescriptionPage></JobDescriptionPage>} />
      <Route path="/users/:username" element={<UserDescriptionPage></UserDescriptionPage>} />
      <Route path="/company/:username" element={<CompanyDescription></CompanyDescription>} />

    </Routes>
  );
}

export { RoutesPath };

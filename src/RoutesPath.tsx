import {  Route, Routes } from "react-router-dom";
import {
  AppliedJob,
  AuthLogin,
  CompanyDescription,
  CompanyList,
  FollowersList,
  JobDescriptionPage,
  JobPostingForm,
  OrganizationSignin,
  UserDescriptionPage,
  UserList,
  UserSignin,
  OrganizationProfilePage,
  OrganizationJobPosted,
  ApplicantsList,
  ErrorPage,
} from "./pages/pages";
import { RestrictAuth } from "./pages/Auth/AuthRoutes/restrict-auth";
import { RequireAuth } from "./pages/Auth/AuthRoutes/require-auth";

import { UserProfilePage } from "./pages/ProfilePage/UserProfilePage/UserProfilePage";
import UserProfileUpdateForm from "./pages/ProfileUpdateForm/UserProfileUpdateForm";
import { HomePageAuth } from "./pages/Auth/AuthRoutes/homepage-auth";

function RoutesPath() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePageAuth></HomePageAuth>
        }
      />
      <Route path="/users" element={<UserList></UserList>} />
      <Route path="/company" element={<CompanyList></CompanyList>} />
      <Route path="*" element={<ErrorPage></ErrorPage>} />
      <Route element={<RestrictAuth></RestrictAuth>}>
        <Route path="/login" element={<AuthLogin></AuthLogin>} />
        <Route path="/signup/user" element={<UserSignin></UserSignin>} />
        <Route
          path="/signup/organization"
          element={<OrganizationSignin></OrganizationSignin>}
        />
      </Route>

      <Route
        path="/job/:id"
        element={<JobDescriptionPage></JobDescriptionPage>}
      />
      <Route
        path="/users/:username"
        element={<UserDescriptionPage></UserDescriptionPage>}
      />
      <Route
        path="/company/:username"
        element={<CompanyDescription></CompanyDescription>}
      />

      <Route element={<RequireAuth></RequireAuth>}>
        <Route
          path="/organization/jobposting"
          element={<JobPostingForm></JobPostingForm>}
        />
        <Route path="/organization/us" element={<OrganizationProfilePage />} />
        <Route path="/jobseeker/us" element={<UserProfilePage />} />
        <Route path="/jobseeker/edit" element={<UserProfileUpdateForm />} />

        <Route
          path="/applicantslist/:jobId"
          element={<ApplicantsList></ApplicantsList>}
        />

        <Route path="/applied" element={<AppliedJob></AppliedJob>} />
        <Route
          path="/jobposted"
          element={<OrganizationJobPosted></OrganizationJobPosted>}
        />

        <Route
          path="/connections/:page"
          element={<FollowersList></FollowersList>}
        />
      </Route>
    </Routes>
  );
}

export { RoutesPath };

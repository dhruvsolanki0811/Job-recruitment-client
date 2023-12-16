import { Route, Routes } from "react-router-dom";
import {
  AllJobPage,
  AppliedJob,
  CompanyList,
  FollowersList,
  FollowingList,
  UserList,
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
    </Routes>
  );
}

export { RoutesPath };

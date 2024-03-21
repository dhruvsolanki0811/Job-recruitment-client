import { Navigate } from "react-router-dom";
import { useUserAuthStore } from "../../../store/AuthStore";
import { AllJobPage } from "../../pages";

export function HomePageAuth() {
    const { user } = useUserAuthStore();
   
    if(user.userType == "organization"){
     return  <Navigate to={`/jobposted`} />
    }
    return <AllJobPage></AllJobPage>
}

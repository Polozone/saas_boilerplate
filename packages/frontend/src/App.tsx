import { Routes, Route } from "react-router-dom";
// import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import HomePage from "./home/HomePage";
import MagicLinkCallback from "./auth/magicLink/callback";
import { AuthProvider } from "./auth/AuthContext";
import SigninMagicLink from "./auth/SigninMagicLink";
import ChooseMailRedirection from "./auth/magicLink/ChooseMailRedirection";
import ProtectedRoute from "./protected/ProtectedRoute";
import JoinOrganizationFromMagicLink from "./auth/magicLink/invitationCallback";
import LayoutSidebar from "./app/dashboard/LayoutSidebar";
import Page from "./app/dashboard/team/Page";
import Index from "./app/dashboard/Index";
import ProjectHome from "./app/dashboard/projects/ProjectHome";

function App() {

  return (
    <div >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninMagicLink />} />
          {/* <Route path="/signinpw" element={<Signin />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/chooseMailRedirection" element={<ChooseMailRedirection />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<LayoutSidebar />}>
              <Route index element={<Index />} />
              <Route path="team" element={<Page />} />
              <Route path="project" element={<ProjectHome />} />
            </Route>
          </Route>
          <Route path="/auth/magiclink/callback" element={<MagicLinkCallback />} />
          <Route path="/auth/joinorganization/callback" element={<JoinOrganizationFromMagicLink />} />
        </Routes>
      </AuthProvider>
    </div>
  );
} export default App;
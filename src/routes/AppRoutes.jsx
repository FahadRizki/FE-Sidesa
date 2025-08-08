import { Routes, Route } from "react-router-dom";

// Public Layout
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Home from "../features/home/Home";
import NewsList from "../features/news/pages/NewsList";
import NewsDetail from "../features/news/pages/NewsDetail";
// import UmkmDetail from "../features/umkm/pages/UmkmDetail";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import ForgotPassword from "../features/auth/ForgotPassword";
import ProfileDesa from "../features/about/ProfileDesa";
import ResetPassword from "../features/auth/ResetPassword";
import VerifyEmail from "../features/auth/VerifyEmail";
import ResendVerification from "../features/auth/ResendVerification";
import ApbdesRedirect from "../features/apbdes/ApbdesRedirect";
import ApbdesDetail from "../features/apbdes/ApbdesDetail";

// User Layout (setelah login)
import UserLayout from "../layouts/UserLayout";
// import UserProfile from "../features/profile/UserProfile";
import UmkmStatus from "../features/umkm/pages/UmkmStatus";
import UmkmList from "../features/umkm/pages/UmkmList";
import LetterStatus from "../features/letter/pages/LetterStatus";
import ComplaintForm from "../features/complaint/pages/ComplaintForm";
import ComplaintStatus from "../features/complaint/pages/ComplaintStatus";
// import ComplaintDetail from "../features/complaint/pages/ComplaintDetail";
import UmkmForm from "../features/umkm/pages/UmkmForm";
import LetterForm from "../features/letter/pages/LetterForm";
import FeedbackForm from "../features/feedback/pages/FeedbackForm";
import PrivateRoute from "./PrivateRoute";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/umkm" element={<UmkmList />} />
        {/* <Route path="/umkm/:id" element={<UmkmDetail />} /> */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:id/:hash" element={<VerifyEmail />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-desa" element={<ProfileDesa />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/apbdes-detail/:tahun" element={<ApbdesDetail />} />
        <Route path="/apbdes/:tahun" element={<ApbdesDetail />} />
        <Route path="/apbdes" element={<ApbdesRedirect />} />
      </Route>

      {/* User (Authenticated) Layout */}
      <Route element={<PrivateRoute />}>
        <Route element={<UserLayout />}>
            {/* <Route path="/profil" element={<UserProfile />} /> */}
            <Route path="/status-umkm" element={<UmkmStatus />} />
            <Route path="/letter-status" element={<LetterStatus />} />
            <Route path="/complaint-status" element={<ComplaintStatus />} />
            <Route path="/complaint-form" element={<ComplaintForm />} />
            {/* <Route path="/complaint/:id" element={<ComplaintDetail />} /> */}
            <Route path="/umkm-form" element={<UmkmForm />} />
            <Route path="/letter" element={<LetterForm />} />
            <Route path="/feedback" element={<FeedbackForm />} />
        </Route>
        </Route>
    </Routes>
  );
};

export default AppRoutes;

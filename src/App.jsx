import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectUser } from "./Slice/UserSlice";
import { selectMeet } from "./Slice/MeetSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PrivateRoutes from "./utils/PrivateRoutes";

//Admin
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import UsersView from "./components/Admin/Users-view";
import Experts from "./components/Admin/Experts";
import VerificationRequests from "./components/Admin/VerificationRequests";
import MeetPage from "./components/Jistsi/MeetPage";
import AdmBlogs from "./components/Admin/AdmBlogs";

//User
import Login from "./components/User/Auth/Login";
import Signup from "./components/User/Auth/SignUp";
import Profile from "./components/User/Auth/Profile";
import Verifyemail from "./components/User/Auth/Verifyemail";
import Forgotpass from "./components/User/Auth/Forgotpass";
import Index from "./components/User";
import Form from "./components/Experts/Form";
import FitMind from "./components/User/FitMind";
import FitBody from "./components/User/FitBody";
import AllExperts from "./components/User/AllExperts";
import Blogs from "./components/User/Blogs/Blogs";
import BlogPage from "./components/User/Blogs/BlogPage";
import BookingPage from "./components/User/BookingPage";

//Expert
import ExpertDash from "./components/Experts/Dashboard";
import CreateBlog from "./components/Experts/CreateBlog";
import Slots from "./components/Experts/Slots";

//Layouts
import HomeLayout from "./components/Layout/HomeLayout";
import MindLayout from "./components/Layout/MindLayout";
import BodyLayout from "./components/Layout/BodyLayout";
import Payment from "./components/User/Stripe Payment/Payment";
import PaymentSuccess from "./components/User/Stripe Payment/PaymentSuccess";
import PaymentCancel from "./components/User/Stripe Payment/PaymentCancel";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPrivateRoutes from "./utils/AdminPrivateRoutes";

function App() {
  const user = useSelector(selectUser);
  const meet = useSelector(selectMeet);

  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<Index />}></Route>
            <Route path="login" element={user ? <Index /> : <Login />} />
            <Route path="signup" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="profile" element={<Profile />} />
              <Route path="verify-email" element={<Verifyemail />} />
              <Route path="forgotpass" element={<Forgotpass />} />
              <Route path="form" element={<Form />} />
              <Route path="expert-dashboard" element={<ExpertDash />} />
              <Route path="createblog" element={<CreateBlog />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blog/:id" element={<BlogPage />} />
              <Route path="expert-slots" element={<Slots />} />
              <Route path="booking-page/:id" element={<BookingPage />} />
              <Route path="payment" element={<Payment />} />
              <Route path="success" element={<PaymentSuccess />} />
              <Route path="cancel" element={<PaymentCancel />} />
              <Route path="allexperts" element={<AllExperts />} />
            </Route>
          </Route>

          <Route path="/mind" element={<MindLayout />}>
            <Route path="fitmind" element={<FitMind />} />
          </Route>

          <Route path="/body" element={<BodyLayout />}>
            <Route path="fitbody" element={<FitBody />} />
          </Route>

          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="verification" element={<MeetPage />} />
          {/* </Route> */}

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={user ? <Dashboard /> : <AdminLogin />} />
            <Route element={<AdminPrivateRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UsersView />} />
              <Route path="experts" element={<Experts />} />
              <Route path="blogs" element={<AdmBlogs />} />
              <Route
                path="verification-requests"
                element={<VerificationRequests />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;

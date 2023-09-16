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

//User
import HomeLayout from "./components/Layout/HomeLayout";
import MindLayout from "./components/Layout/MindLayout";
import Login from "./components/User/Login";
import Signup from "./components/User/SignUp";
import Profile from "./components/User/Profile";
import Verifyemail from "./components/User/Verifyemail";
import Forgotpass from "./components/User/Forgotpass";
import Index from "./components/User";
import Form from "./components/Experts/Form";
import PaymentForm from "./components/User/PaymentForm";
import FitMind from "./components/User/FitMind";
import Blogs from "./components/User/Blogs";
import BlogPage from "./components/User/BlogPage";
import BookingPage from "./components/User/BookingPage";

//Expert
import ExpertDash from "./components/Experts/Dashboard";
import CreateBlog from "./components/Experts/CreateBlog";
import Slots from "./components/Experts/Slots";

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);
function App() {
  const user = useSelector(selectUser);
  const meet = useSelector(selectMeet);
  const [clientSecret, setClientSecret] = useState();
  useEffect(() => {
    setClientSecret(import.meta.env.VITE_REACT_APP_STRIPE_SECRET_KEY);
  }, []);
  console.log(clientSecret);
  if (!clientSecret) {
    return <h1>Loading</h1>
  }
  const options = {
    // passing the client secret obtained from the server
    clientSecret: `{{ ${clientSecret} }}`,
  };
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
              <Route
                path="payment"
                element={
                  <Elements stripe={stripePromise} options={options}>
                    <PaymentForm />
                  </Elements>
                }
              />

              {/* <Route path="meet-start" element={<MeetStart />} /> */}
              {/* <Route path="meet-end" element={<MeetExit />} />   */}
            </Route>
          </Route>
          <Route path="/mind" element={<MindLayout />}>
            <Route path="fitmind" element={<FitMind />} />
          </Route>

          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="verification" element={<MeetPage />} />
          {/* </Route> */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersView />} />
            <Route path="experts" element={<Experts />} />
            <Route
              path="verification-requests"
              element={<VerificationRequests />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./components/User/Login";
import Signup from "./components/User/SignUp";
import HomeLayout from "./components/Layout/HomeLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import Profile from "./components/User/Profile";
import Verifyemail from "./components/User/Verifyemail";
import Dashboard from "./components/Admin/Dashboard";
import UsersView from "./components/Admin/Users-view";
import Forgotpass from "./components/User/Forgotpass";
import Index from "./components/User";
import Form from "./components/Experts/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Index />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="verify-email" element={<Verifyemail />} />
            <Route path="forgotpass" element={<Forgotpass />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

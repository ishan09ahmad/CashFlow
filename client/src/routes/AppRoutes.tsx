import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import ResetPassword from "../pages/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import Categories from "../pages/Categories";
import VerifyEmail from "../pages/VerifyEmail";
import Settings from "../pages/settings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/settings" element={<Settings />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/categories" element={<Categories />} />
      </Route>



      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

import { Outlet } from "react-router-dom";
import Header from "../Admin/Header";
import Slider from "../Admin/Slider";

function AdminLayout() {
  return (
    <div>
      <Header className="min-h-screen flex flex-col justify-between" />
      <main className="flex h-screen ">
        <Slider />
        <div className="flex w-full justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;

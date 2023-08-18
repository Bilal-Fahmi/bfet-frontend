import { Outlet } from "react-router";
import Header from "../User/Header";
import Footer from "../User/Footer";
import Slider from "../User/Slider";
import Cursor from "../Cursor/Cursor"
import { Toaster } from "react-hot-toast";

function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between cursor-none">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main className="flex h-screen ">
        <Slider />
        <div className="flex w-full justify-center">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Cursor  />
    </div>
  );
}

export default HomeLayout;

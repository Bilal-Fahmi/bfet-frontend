import { Outlet } from "react-router";
import Footer from "../User/Footer";
import Slider from "../User/Slider";
import Cursor from "../Cursor/Cursor"
import { Toaster } from "react-hot-toast";
import MindHeader from "../User/Headers/MindHeader";

function MindLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <Toaster position="top-center" reverseOrder={false} className="light" />
      <MindHeader/>
      <main className="flex h-screen ">
        <Slider />
        <div className="flex w-full justify-center">
          <Outlet />
        </div>
      </main>
      <Footer />
      {/* <Cursor  />  */}
    </div>
  );
}

export default MindLayout;

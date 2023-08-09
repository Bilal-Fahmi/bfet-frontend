import { Outlet } from "react-router"
import Header from '../User/Header'
import Footer from "../User/Footer"
import { Toaster } from "react-hot-toast"


function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout
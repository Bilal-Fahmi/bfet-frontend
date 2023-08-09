import { Outlet } from "react-router-dom";
import  Header  from '../Admin/Header'
import Slider from '../Admin/Slider'

function AdminLayout() {
    return (
        <div>
            <Header />
            <Slider/>       
            <main>
                <Outlet/>
            </main>
        </div>
    )
     
}

export default AdminLayout
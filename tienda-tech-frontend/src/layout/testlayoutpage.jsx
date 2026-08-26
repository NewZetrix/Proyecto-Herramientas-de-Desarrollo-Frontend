 import Navbar from "../components/Navbar"
 import Sidebar from "../components/Sidebar"
 import Footer from "../components/Footer"
 import { Outlet } from "react-router-dom";

export default function Testpage(){
    return(
        <>
        <Navbar/>
        <div>
            {/*<Sidebar/>*/}
            <Outlet/>
        </div>
        <Footer/>
        </>
    )
}
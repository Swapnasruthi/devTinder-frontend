import { Outlet } from "react-router-dom";
import Navbar from "./NavBar"
import Footer from "./Footer";

const Body = ()=> {
    return(
        <div className="h-screen" data-theme="dark">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
        
 
    
    )
}
export default Body;
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar"
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import Error from "./Error";

const Body = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    const fetchingUser = async ()=>{
        if(userData) return userData;
        try{
            const res = await axios.get("http://localhost:3000/profile",{},
                {withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status === 401){
                navigate("/login");

            }
            else{
                {<Error/>}
            }
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchingUser();
    },[])

    return(
        <div className="h-screen" data-theme="dark">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default Body;
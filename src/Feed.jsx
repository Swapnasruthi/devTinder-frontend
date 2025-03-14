import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { BACKEND_URL } from "./Constants";

// import {ThreeDCardDemo} from "./UIcard";
// import { CardStackDemo } from "./UserCard2";
const Feed = ()=>{
   const dispatch = useDispatch();
   const feed = useSelector((store) => store.feed);
   const getFeed = async ()=>{
    try{
       
        const res = await axios.get(BACKEND_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res.data));
    }
    catch(err){
        console.error(err);
    }
   }


   useEffect(()=>{
    getFeed();
   },[]);


   if(!feed) return <div className="flex justify-center items-center mt-52 text-3xl font-bold">Loading...</div>
   if(feed.length==0) return <div className="flex justify-center mt-10">No New Users Found!</div>
    
    return feed &&(
            <div className="mt-10 flex justify-center m-auto">
                <UserCard user={feed[0]}/>
                

            </div>

        )

}

export default Feed;
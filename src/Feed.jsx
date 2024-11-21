import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedslice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = ()=>{
   const dispatch = useDispatch();
   const feed = useSelector((store) => store.feed);
   const getFeed = async ()=>{
    try{
        if(feed) return;
        const res = await axios.get("http://localhost:3000/feed",{withCredentials:true});
        dispatch(addFeed(res.data));
    }
    catch(err){
        console.error(err);
    }
   }

   useEffect(()=>{
    getFeed();
   },[]);

  
    return feed &&(
            <div className="flex justify-center my-12">
                <UserCard user={feed[0]}/>

            </div>
        )

}
export default Feed;
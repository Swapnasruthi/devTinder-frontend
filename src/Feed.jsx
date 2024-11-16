import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedslice";
import { useEffect } from "react";

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

    return(
        <div>
            <h1>Feed</h1>
        </div>
    )
}
export default Feed;
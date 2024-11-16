import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [email, setEmail] = useState("sandhya@gmail.com");
    const [password, setPassword] = useState("Sandhya@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState();
    const handleSubmit = async()=>{
        try{
            const res = await axios.post("http://localhost:3000/login",
                {
                    email,
                    password
                },{withCredentials:true});
                
                dispatch(addUser(res.data));
                return navigate("/");
                
        }
        catch(err){
            setErrorMsg(err?.response?.data || "something wrong");
            console.error(err);
        }
    }
    return (
        <div className="flex justify-center my-24">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div>
                    <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                             
                            </div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                             
                            </div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                          
                    </label>
                    </div>
                    <p className="text-red-500">{errorMsg}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                </div>
        </div>
    )
   
}
export default Login;
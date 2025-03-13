import { BACKEND_URL } from "../Constants"; 
import { io } from "socket.io-client";

export const createSocketConnection = () => {
    if(location.hostname === "localhost"){
        return io(BACKEND_URL);
    }else{
        return io("/", {path: "/api/socket.io"} );

    }
}
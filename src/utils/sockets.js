import { BACKEND_URL } from "../Constants"; 
import { io } from "socket.io-client";

export const createSocketConnection = () => {
    return io(BACKEND_URL);
}
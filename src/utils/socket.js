import { io } from "socket.io-client"; // ✅ correct import
import { BASEURL } from "./constants";

export const createSocketConnection = () => {
    return io(BASEURL);
};



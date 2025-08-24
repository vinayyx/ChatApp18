import { io } from "socket.io-client";

// Apna backend ka URL daalna yaha
const SOCKET_URL = "http://localhost:5000";  

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default socket;

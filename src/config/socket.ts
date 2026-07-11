import { io } from "socket.io-client";
import { env } from "./env";

const URL = env.VITE_NODE_ENV === "production" ? undefined : "http://localhost:3000"

export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true
})
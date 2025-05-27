import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import { addMessage } from "../store/messages";
import { Message } from "@backend/types";

export const useSocket = () => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      return;
    }
    // Connect to WebSocket server
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_API || ``, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server!");
    });

    newSocket.on("newMessage", (message: Message) => {
      dispatch(addMessage(message));
    });

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  return { socket };
};

import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";

export const useSocket = (
  clientId: string,
  onPrivateMessage: (data: any) => void,
  onRoomMessage: (data: any) => void
) => {
  useEffect(() => {
    connectSocket(clientId, onPrivateMessage, onRoomMessage);

    return () => {
      disconnectSocket();
    };
  }, [clientId]);
};

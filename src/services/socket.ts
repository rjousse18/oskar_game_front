import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;

export const connectSocket = (
  clientId: string,
  onPrivateMessage: (data: any) => void,
  onRoomMessage: (data: any) => void
) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,

    onConnect: () => {
      console.log("STOMP CONNECTED");

      stompClient?.subscribe(`/topic/client/${clientId}`, (msg) => {
        onPrivateMessage(JSON.parse(msg.body));
      });
    },

    onStompError: (frame) => {
      console.error("STOMP ERROR:", frame);
    },
  });

  stompClient.activate();
};

export const subscribeToRoom = (
  roomId: string,
  callback: (data: any) => void
) => {
  stompClient?.subscribe(`/topic/room/${roomId}`, (msg) => {
    callback(JSON.parse(msg.body));
  });
};

export const sendMessage = (payload: any) => {
  if (!stompClient || !stompClient.connected) {
    console.warn("STOMP not connected yet");
    return;
  }

  stompClient.publish({
    destination: "/app/game",
    body: JSON.stringify(payload),
  });
};

export const disconnectSocket = () => {
  stompClient?.deactivate();
};

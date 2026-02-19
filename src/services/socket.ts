import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client: Client | null = null;

export const connectSocket = (
  onConnect: () => void,
  onError?: (error: any) => void
) => {
  const socket = new SockJS("http://localhost:8080/ws");

  client = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("STOMP CONNECTED");
      onConnect();
    },
    onStompError: (frame) => {
      console.error("STOMP error", frame);
      if (onError) onError(frame);
    },
  });

  client.activate();
};

export const getClient = () => client;

export const sendMessage = (destination: string, body: any) => {
  if (!client || !client.connected) {
    console.log("STOMP not connected yet");
    return;
  }

  client.publish({
    destination,
    body: JSON.stringify(body),
  });
};

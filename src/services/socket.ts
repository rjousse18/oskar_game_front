import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Instance STOMP partagée à travers l'application
let client: Client | null = null;

/*
  Ici, on initialise et active la connexion WebSocket via STOMP :
  - onConnect : appelé dès que la connexion est établie (pour s'abonner aux topics)
  - onError   : optionnel, appelé en cas d'erreur STOMP
*/

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
      console.error("STOMP ERROR", frame);
      onError?.(frame);
    },
  });

  client.activate();
};

export const getClient = () => client;

// Publie un message JSON vers une destination STOMP (ne fait rien si le client n'est pas connecté)
export const sendMessage = (destination: string, body: any) => {
  if (!client?.connected) {
    console.warn("STOMP not connected yet");
    return;
  }

  client.publish({
    destination,
    body: JSON.stringify(body),
  });
};

import { useEffect, useState } from "react";
import { connectSocket, getClient } from "../services/socket";

export const useSocket = (
  clientId: string,
  roomId: string | undefined,
  onPrivateMessage: (msg: any) => void,
  onRoomMessage: (msg: any) => void
) => {
  const [connected, setConnected] = useState(false);

  // Connexion initiale
  useEffect(() => {
    connectSocket(() => {
      setConnected(true);

      const client = getClient();
      if (!client) return;

      client.subscribe(`/topic/client/${clientId}`, (message) => {
        const body = JSON.parse(message.body);
        onPrivateMessage(body);
      });
    });

    return () => {
      const client = getClient();
      client?.deactivate();
    };
  }, []);

  // Abonnement à la room quand roomId change
  useEffect(() => {
    if (!connected || !roomId) return;

    const client = getClient();
    if (!client) return;

    const subscription = client.subscribe(
      `/topic/room/${roomId}`,
      (message) => {
        const body = JSON.parse(message.body);
        onRoomMessage(body);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [connected, roomId]);

  return connected;
};

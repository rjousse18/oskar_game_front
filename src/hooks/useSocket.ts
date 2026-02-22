import { useEffect, useRef, useState } from "react";
import { connectSocket, getClient } from "../services/socket";

/*
  Ici je gère la connexion WebSocket STOMP :
  - S'abonne au canal privé du client dès la connexion
  - S'abonne / désabonne dynamiquement au canal de la room quand roomId change
  - Retourne l'état de connexion pour conditionner les actions dans les composants
*/

export const useSocket = (
  clientId: string,
  roomId: string | undefined,
  onPrivateMessage: (msg: any) => void,
  onRoomMessage: (msg: any) => void
) => {
  const [connected, setConnected] = useState(false);

  // Refs stables afin d'éviter de re-déclencher les effets à chaque render
  const onPrivateRef = useRef(onPrivateMessage);
  const onRoomRef = useRef(onRoomMessage);
  onPrivateRef.current = onPrivateMessage;
  onRoomRef.current = onRoomMessage;

  // Connexion initiale au WebSocket et abonnement au canal privé du client
  useEffect(() => {
    connectSocket(() => {
      setConnected(true);

      const client = getClient();
      if (!client) return;

      // Écoute les messages destinés uniquement à ce client 
      client.subscribe(`/topic/client/${clientId}`, (message) => {
        const body = JSON.parse(message.body);
        onPrivateRef.current(body);
      });
    });

    // Déconnexion
    return () => {
      getClient()?.deactivate();
    };
  }, [clientId]); 

  // Abonnement dynamique à la room dès que roomId est disponible
  useEffect(() => {
    if (!connected || !roomId) return;

    const client = getClient();
    if (!client) return;

    // Écoute les messages broadcast à tous les joueurs de la room
    const subscription = client.subscribe(`/topic/room/${roomId}`, (message) => {
      const body = JSON.parse(message.body);
      onRoomRef.current(body);
    });

    // Désabonnement si roomId change ou composant démonté
    return () => {
      subscription.unsubscribe();
    };
  }, [connected, roomId]);

  return connected;
};

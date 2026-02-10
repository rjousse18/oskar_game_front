import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";
import { Socket } from "socket.io-client";

export const useSocket = () => {

    // State pour stocker la connexion socket
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Connexion au serveur socket
        const s = connectSocket();

        // On stocke la connexion dans le state
        setSocket(s);

        // On se déconnecte du socket à la destruction du composant pour éviter les fuites de mémoire
        return () => {
            disconnectSocket();
        };
    }, []);

    return socket;
};

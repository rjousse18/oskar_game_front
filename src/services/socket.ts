import { io, Socket } from "socket.io-client";

// On crée une variable pour stocker la connexion Socket.IO
let socket: Socket | null = null;

// On crée une fonction pour se connecter au serveur Socket.IO
export const connectSocket = () => {
    if (!socket) {
        socket = io("http://localhost:3000");
    }
    return socket;
};

// On crée une fonction pour se déconnecter du serveur Socket.IO
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
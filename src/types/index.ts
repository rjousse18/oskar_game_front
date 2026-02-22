// Représente un joueur dans la room
export interface Player {
  clientId: string;
  pseudo: string;
  color: string;
  hasVoted?: boolean;
  ready: boolean;
  admin: boolean;
  movieItems: MovieItem[];
}

// Représente l'état global de la partie, partagé via GameContext
export interface GameState {
  roomId: string;
  players: Player[];
  inProgress: boolean;
  hostId?: string;
  predictions: Prediction[];
  step: number;
}

export interface RoomMessage {
  id: string;
  players: Player[];
  inProgress: boolean;
  predictions: Prediction[];
  step: number;
}

export interface Prediction {
  category_name: string;
  category_id: number;
  movieItems: MovieItem[];
}

export interface Movie {
  movieId: number;
  title: string;
  original_title: string;
  year: number;
}

export interface MovieItem {
  movieItemId: number;
  nominee: string;
  movie: Movie;
  players: Player[];
}

export enum MessageType {
    CREATE_ROOM,
    JOIN_ROOM,
    PLAYER_READY,
    PLAYER_CANCEL_READY,
    START_GAME,
    SEND_PREDICTION
}

export interface WebSocketMessage {
    type: MessageType;
    roomId: string | null;
    pseudo: string;
    clientId: string;
    movieItem: MovieItem | null; // Prediction use made.
}
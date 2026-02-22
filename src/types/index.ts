// Représente un joueur dans la room
export interface Player {
  id: string;
  pseudo: string;
  color: string;
  hasVoted?: boolean;
}

// Représente un nommé dans une catégorie
export interface Nominee {
  id: string;
  artist: string;
  film: string;
}

// Représente une catégorie de récompense
export interface Category {
  id: number;
  name: string;
}

// Représente l'état global de la partie, partagé via GameContext
export interface GameState {
  roomId: string;
  players: Player[];
  currentCategory?: Category;
  inProgress: boolean;
  hostId?: string;
}

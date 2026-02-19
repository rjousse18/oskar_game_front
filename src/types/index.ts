export interface Player {
  id: string;
  pseudo: string;
  color: string;
  hasVoted?: boolean;
}

export interface Nominee {
  id: string;
  artist: string;
  film: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface GameState {
  roomId: string;
  players: Player[];
  currentCategory?: Category;
  inProgress: boolean;
  hostId?: string;
}

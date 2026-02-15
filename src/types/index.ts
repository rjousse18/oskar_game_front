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

export interface CategoryLocationState {
  players: Player[];
  gameCode: string;
  currentPlayerId: string;
}
// types/User.ts

export interface Friend {
  firstname: string;
  lastname: string;
  username: string;
  chatId: number;
}

export interface Transaction {
  transactionType: string;
  amount: number;
  date: string;
}

export interface GameHistory {
  won: boolean;
  opponent: string;
  amount: number;
  date: string;
  opponentPhoto:string
}

export type User = {
  username?: string | null | undefined;
  chatId?: number | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  balance?: number;
  friends?: Friend[];
  transactions?: Transaction[];
  history?: GameHistory[];
  _id?: String,
  waitingForPlayer2?: boolean,
  waitingForPlayer1?:boolean,
  player2Photo?:string,
  player1Photo?:string,
  player1Name?:string,
  player2Name?:string,
  photo?: string,
  walletAddress?:string,
  gameOngoing?:boolean,
  player2HasJoined?: boolean
  walletBalance?:string
} | null

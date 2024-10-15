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

export interface History {
  won: boolean;
  player2: string;
  amountWon: number;
  date: string;
}

export type User = {
  username?: string | null | undefined;
  chatId?: number | null | undefined;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  balance?: number;
  friends?: Friend[];
  transactions?: Transaction[];
  history?: History[];
  _id?: String,
  waitingForPlayer2?: boolean,
  photo?: String
} | null

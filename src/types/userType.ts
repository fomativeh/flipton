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
    username: string | null;
    chatId: number | null;
    firstname: string | null;
    lastname: string | null;
    balance: number;
    friends: Friend[];
    transactions: Transaction[];
    history: History[];
    _id:String,
    photo:String
  } | null
  
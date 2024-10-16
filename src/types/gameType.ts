export type gameStatusType = "ongoing" | "waiting" | "completed"
export type gameType = {
    wagerAmount: number;
    creatorChosenSide: "Head" | "Tail";
    player1Name: string;
    player1Id: number;
    player2Id?: number,
    player2Name?: string,
    status: gameStatusType
}
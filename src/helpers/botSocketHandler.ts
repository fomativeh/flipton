
import { gameStatusType, gameType } from "@/types/gameType";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type newGameEventType = {
    wagerAmount: any;
    creatorChosenSide: any;
    player1Name: any;
    player1Id: any;
    status: gameStatusType
}

export const botSocketHandler = (botSocket: any, gamesRef: MutableRefObject<gameType[] | null>, chatId: number, setGames: Dispatch<SetStateAction<gameType[]>>) => {
    // Listen for connection to tasks socket server

    botSocket.on("connect", () => {
        console.log("conncted to bot socket server");
        botSocket.emit("register", chatId);
        // console.log("registered tasks server");
        //Update gamelobby list in realtime(When users receive crd from completing tasks)
        botSocket.on("new_game", (data: newGameEventType) => {
            setGames([...gamesRef.current as [], data]);
            console.log("Socket sent a new game.", data)
        });
    });
}
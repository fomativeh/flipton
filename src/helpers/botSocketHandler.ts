
import { gameStatusType, gameType } from "@/types/gameType";
import { User } from "@/types/userType";
import { winnerType } from "@/types/winnerType";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type newGameEventType = {
    wagerAmount: any;
    creatorChosenSide: any;
    player1Name: any;
    player1Id: any;
    status: gameStatusType
}

type player2JoinEventType = {
    player2Name: string,
    player2Photo: string
}

type gameOngoingEventType = {
    player1Id: number,
    player2Name: string
}

type player1StartedEvent = {
    wagerAmount:number,
    creatorChosenSide:"Head" | "Tail"
} | null

type player1DetailsType = {player1Photo: string, player1Name: string }

export const botSocketHandler = (botSocket: any, gamesRef: MutableRefObject<gameType[] | null>, chatId: number, setGames: Dispatch<SetStateAction<gameType[]>>, setUserData: Dispatch<SetStateAction<User>>, setWinner: Dispatch<SetStateAction<winnerType>>, setTossing: Dispatch<SetStateAction<boolean>>, setDataForPlayer2:Dispatch<SetStateAction<player1StartedEvent>>) => {
    // Listen for connection to tasks socket server
    botSocket.on("connect", () => {
        console.log("conncted to bot socket server");
        botSocket.emit("register", chatId);
        // console.log("registered tasks server");
        //Update gamelobby list in realtime(When users receive crd from completing tasks)
        botSocket.on("new_game", (data: newGameEventType) => {
            setGames([...gamesRef.current as [], data]);
        });

        //Update user data when player 2 joins
        botSocket.on("player_2_joined", (data: player2JoinEventType) => {
            setUserData((prevData) => ({
                ...prevData, ...data, player2HasJoined:true
            }));
        });

        //Update gameLobby
        botSocket.on("game_ongoing", (data: gameOngoingEventType) => {
            let allGames = gamesRef.current as gameType[]
            let other = allGames.filter(eachGame => eachGame.player1Id != data.player1Id)
            let gameToUpdate = allGames.filter(eachGame => eachGame.player1Id == data.player1Id)[0] as gameType
            gameToUpdate.status = "ongoing"
            gameToUpdate.player2Name = data.player2Name

            const updatedGames = [...other as gameType[], gameToUpdate]
            setGames(updatedGames as gameType[])
        });

        //Toss start
        botSocket.on("toss_started", () => {
            setTossing(true)
        })

        //Remove game
        botSocket.on("remove_game", (player1Id: number) => {
            let allGames = gamesRef.current as gameType[]
            let updatedGames = allGames.filter(eachGame => eachGame.player1Id != player1Id)

            setGames(updatedGames)
        })

        //Game winner update
        botSocket.on("winner", (winner: winnerType) => {
            setWinner(winner)
        })

        //Player 1 info (for joining player)
        botSocket.on("player1Details", (data: player1DetailsType) => {
            setUserData((prevData) => ({
                ...prevData, player1Name:data.player1Name, player1Photo:data.player1Photo
            }));
        })

        //Player 1 started game
        botSocket.on("player_1_started", (data:player1StartedEvent) => {
            setDataForPlayer2(data)
        })
    });
}
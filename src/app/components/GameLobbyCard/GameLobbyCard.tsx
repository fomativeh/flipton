import React, { Dispatch, SetStateAction } from "react";
import "./GameLobbyCard.css";
import Image from "next/image";
import { gameType } from "@/types/gameType";
import { formatNumberWithCommas } from "fomautils";
import { joinGame } from "@/api/game";

type Props = {
  setIsCreatingGame: Dispatch<SetStateAction<boolean>>;
  gameDetails: gameType;
  chatId: number;
};

const GameLobbyCard = ({ setIsCreatingGame, gameDetails, chatId }: Props) => {
  const { player1Name, player2Name, status, wagerAmount, player1Id } =
    gameDetails;
  const inProgress = status == "waiting" ? false : true;

  const handleJoin = async () => {
    if (inProgress) return;
    try {
      const joinGameRes  = await joinGame(chatId, player1Id, "")
      
    } catch (error) {
      
    }
  };

  return (
    <section className="my-[15px] fade-card w-full rounded-[8px] px-[15px] py-[10px] flex justify-between items-center relative">
      <section className="flex flex-col justify-center items-start text-white font-[Poppins]">
        <span>{player1Name}</span>
        <span className="font-medium text-[10px]">vs</span>
        <span className={`${inProgress ? `opacity-[100%]` : `opacity-[50%]`}`}>
          {inProgress ? `${player2Name}` : `Player 2`}
        </span>
      </section>

      <section className="flex flex-col justify-center items-center">
        <figure className="relative w-[28px] h-[28px] mb-[5px]">
          <Image src={"/assets/icons/coin.svg"} alt={"Coin icon"} fill />
        </figure>
        <span className="font-[Roboto] text-[14px] font-medium text-white">
          {formatNumberWithCommas(wagerAmount)}
        </span>
      </section>

      <section className="flex flex-col justify-center items-center">
        <span
          className="flex justify-center items-center w-[76px] h-[18px] progress-waiting-card rounded-[2px] font-[Poppins] text-[10px] mb-[15px]"
          style={{ color: `${inProgress ? `#065F24` : `red`}`, marginTop:`${ player1Id == chatId && `mt-[-25px]`}`}}
        >
          {inProgress ? "In Progress" : "Waiting"}
        </span>
        {player1Id != chatId && (
          <span
            className={`flex justify-center items-center w-[96px] h-[28px] bg-[#D0BCFF] font-[Roboto] text-[14px] font-medium text-[#381E72] rounded-[4px] ${
              inProgress ? `opacity-[50%]` : `opacity-[100%]`
            }`}
            onClick={handleJoin}
          >
            Join Now
          </span>
        )}
      </section>
    </section>
  );
};

export default GameLobbyCard;

import React, { Dispatch, SetStateAction, useState } from "react";
import "./GameLobbyCard.css";
import Image from "next/image";
import { gameType } from "@/types/gameType";
import { formatNumberWithCommas } from "fomautils";
import { joinGame } from "@/api/game";
import { TonConnectUI } from "@tonconnect/ui-react";

type Props = {
  setIsCreatingGame: Dispatch<SetStateAction<boolean>>;
  gameDetails: gameType;
  chatId: number;
  tonConnectUI:TonConnectUI
  setWalletErr:Dispatch<SetStateAction<string>>
};

const GameLobbyCard = ({ setIsCreatingGame, gameDetails, chatId, tonConnectUI, setWalletErr }: Props) => {
  const [joining, setJoining] = useState<boolean>(false);
  const { player1Name, player2Name, status, wagerAmount, player1Id } =
    gameDetails;
  const inProgress = status == "waiting" ? false : true;

  const handleJoin = async () => {
    if (inProgress) return;
    if (joining) return;

    if (!tonConnectUI.connected) {
      setWalletErr("Please connect your wallet to join a game.");
      return setTimeout(() => setWalletErr(""), 2800);
    }

    setJoining(true);
    try {

      try {
        // Convert the TON amount to nanoTONs
        const amountInNanoTons = Math.floor(parseFloat(`${wagerAmount}`) * 1e9).toString();
        // // Prepare the transaction payload
        const transactionPayload = {
          validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
          messages: [
            {
              address: process.env.NEXT_PUBLIC_RECEIVING_ADDRESS as string, // Replace with the actual recipient address
              amount: amountInNanoTons, // The amount in nanoTONs as a string
            },
          ],
        };

        // Send the transaction
        await tonConnectUI.sendTransaction(transactionPayload);
        await joinGame(chatId, player1Id, "");
      } catch (error) {
        setJoining(false);
        setWalletErr("Payment failed. Please try again.")
      }
    } catch (error) {
      setJoining(false);
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
          style={{
            color: `${inProgress ? `#065F24` : `red`}`,
            marginTop: `${player1Id == chatId && `mt-[-25px]`}`,
          }}
        >
          {inProgress ? "In Progress" : "Waiting"}
        </span>
        {player1Id != chatId && (
          <span
            className={`flex justify-center items-center w-[96px] h-[28px] bg-[#D0BCFF] font-[Roboto] text-[14px] font-medium text-[#381E72] rounded-[4px] ${
              inProgress || joining ? `opacity-[50%]` : `opacity-[100%]`
            }`}
            onClick={handleJoin}
          >
            <span className={`${joining && `mr-[10px]`}`}>
              {joining ? `Joining` : `Join`}
            </span>
            {joining && <div className="loader-2"></div>}
          </span>
        )}
      </section>
    </section>
  );
};

export default GameLobbyCard;

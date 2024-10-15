"use client";
import { createNewGame } from "@/api/user";
import GameLobbyCard from "@/app/components/GameLobbyCard/GameLobbyCard";
import TopHeader from "@/app/components/TopHeader/TopHeader";
import { User } from "@/types/userType";
import { TonConnectUI } from "@tonconnect/ui-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  avatar: string;
  name: String;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  chatId: number;
  token: string;
  showGamesList: boolean;
  setIsCreatingGame: Dispatch<SetStateAction<boolean>>;
  isCreatingGame: boolean;
  showCreatedModal: boolean;
  showGameplayModal: boolean;
  showGameResult: boolean;
  setShowGamesList: Dispatch<SetStateAction<boolean>>;
  setShowCreatedModal: Dispatch<SetStateAction<boolean>>;
  setShowGameplayModal: Dispatch<SetStateAction<boolean>>;
  setShowGameResult: Dispatch<SetStateAction<boolean>>;
  handleWalletClick: () => void;
  walletLoaded: boolean;
  tonConnectUI: TonConnectUI;
  walletAddress: string;
  walletErr: string;
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
};

const GameLobby = ({
  avatar,
  walletErr,
  name,
  setCurrentPage,
  chatId,
  token,
  showCreatedModal,
  showGameResult,
  showGameplayModal,
  showGamesList,
  isCreatingGame,
  setShowCreatedModal,
  setShowGamesList,
  setShowGameplayModal,
  setShowGameResult,
  setIsCreatingGame,
  walletLoaded,
  handleWalletClick,
  tonConnectUI,
  walletAddress,
  userData,
  setUserData,
}: Props) => {
  const [wagerAmount, setWagerAmount] = useState<string | null>(null);
  const [err, setErr] = useState<string>("");

  const [coinSideSelected, setCoinSideSelected] = useState<"Head" | "Tail">(
    "Head"
  );

  const handleCoinSideSelect = (side: "Head" | "Tail") => {
    // This function sets the selected coin side and resets the other.
    setCoinSideSelected(side);
  };

  const createGame = async () => {
    if (!wagerAmount) {
      setErr("Wager amount is required.");
      return setTimeout(() => setErr(""), 2800);
    }

    if (parseInt(wagerAmount) < 0.5) {
      setErr("Valid wager amount = 0.5 upwards.");
      return setTimeout(() => setErr(""), 2800);
    }

    try {
      const createNewGameRes = await createNewGame(
        chatId,
        token,
        parseInt(wagerAmount),
        coinSideSelected
      );
      if (createNewGameRes?.success) {
        setUserData({ ...userData, waitingForPlayer2: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative flex flex-col justify-start items-center">
      <h1
        className="gamelobby-title font-[Poppins] font-medium text-[32px] mt-[25px] text-center"
        style={{ visibility: `${showGamesList ? `visible` : `hidden`}` }}
      >
        FlipTON
      </h1>

      <TopHeader
        walletAddress={walletAddress}
        tonConnectUI={tonConnectUI}
        walletLoaded={walletLoaded}
        name={name as string}
        handleWalletClick={handleWalletClick}
        avatar={avatar}
        showGamesList={showGamesList}
      />
      {walletErr && (
        <p className="text-red-300 mt-[10px] text-center max-w-[85%]">
          {walletErr}
        </p>
      )}

      {showGamesList && (
        <section className="w-full mt-[30px] flex flex-col justify-start items-start mb-[150px]">
          <GameLobbyCard
            setIsCreatingGame={setIsCreatingGame}
            inProgress={true}
          />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
          <GameLobbyCard setIsCreatingGame={setIsCreatingGame} />
        </section>
      )}

      {isCreatingGame && (
        <section className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <span className="gamelobby-title font-[Poppins] font-semibold text-[20px] mb-[25px] text-center">
            Enter Wager Amount
          </span>

          <section className="flex justify-start items-center mb-[40px]">
            <figure className="w-[48px] h-[48px] relative mr-[20px]">
              <Image src={"/assets/icons/coin.png"} alt="Coin icon" fill />
            </figure>

            <input
              value={wagerAmount as string}
              onChange={(e) => setWagerAmount(e.target.value)}
              type="number"
              className="border-b-[2px] border-b-[#6B5F82] w-[140px] h-[40px] outline-none text-white font-[Poppins] bg-transparent"
            />
          </section>

          <section className="w-[156px] h-[34px] flex justify-between items-center rounded-[4px] bg-[#4A4458]">
            <span
              onClick={() => handleCoinSideSelect("Head")}
              className={`flex justify-center items-center cursor-pointer w-[76px] h-[33px] font-[Roboto] font-medium text-[14px] rounded-[inherit] ${
                coinSideSelected == "Head" && `bg-[#D0BCFF]`
              }`}
              style={{
                color: `${coinSideSelected === "Head" ? `#381E72` : `white`}`,
              }}
            >
              Heads
            </span>
            <span
              onClick={() => handleCoinSideSelect("Tail")}
              className={`flex justify-center items-center cursor-pointer w-[76px] h-[33px] font-[Roboto] font-medium text-[14px] rounded-[inherit] ${
                coinSideSelected == "Tail" && `bg-[#D0BCFF]`
              }`}
              style={{
                color: `${coinSideSelected === "Tail" ? `#381E72` : `white`}`,
              }}
            >
              Tails
            </span>
          </section>

          {err && <p className="text-red-300 my-[10px]">{err}</p>}

          <span
            onClick={createGame}
            className="mt-[50px] w-[151px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]"
          >
            Create New Game
          </span>
        </section>
      )}

      {showCreatedModal && (
        <section className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
          <section className="flex justify-start items-center mb-[5px]">
            <span className="font-[Poppins] text-[36px] font-medium text-white mr-[10px]">
              {wagerAmount}
            </span>
            <figure className="w-[32px] h-[32px] relative">
              <Image src={"/assets/icons/coin.png"} alt="Coin icon" fill />
            </figure>
          </section>

          <span className="gamelobby-title font-[Poppins] font-medium text-[20px] text-center">
            Game created successfully!
          </span>

          <span
            onClick={() => setShowGameplayModal(true)}
            className="mt-[50px] w-[151px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]"
          >
            Play Now
          </span>
        </section>
      )}

      {showGameplayModal && (
        <section className="w-full h-full top-0 left-0 absolute flex flex-col justify-center items-center px-[20px]">
          <figure className="w-[112px] h-[112px] relative">
            <Image src={"/assets/icons/coin.svg"} alt="Coin icon" fill />
          </figure>

          <span
            onClick={() => setShowGameResult(true)}
            className={`mt-[30px] w-[108px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px] ${
              showGameResult ? `opacity-[50%]` : `opacity-[100%]`
            }`}
          >
            Click To Toss
          </span>

          <section className="w-full flex justify-between items-start mt-[35px]">
            <section className="flex flex-col justify-center items-start font-[Poppins] text-white">
              <span>Vishisht Kapoor</span>
              <section className="flex items-center justify-start">
                <span className="font-medium">30</span>
                <figure className="w-[16px] h-[16px] relative ml-[10px]">
                  <Image src={"/assets/icons/coin.svg"} alt="Coin icon" fill />
                </figure>
              </section>
              <span>Heads</span>
            </section>

            <span className="text-[10px] font-medium font-[Poppins] text-white">
              vs
            </span>

            <section className="flex flex-col justify-center items-start font-[Poppins] text-white">
              <span>Prabhakar Rai</span>
              <section className="flex items-center justify-start">
                <span className="font-medium">30</span>
                <figure className="w-[16px] h-[16px] relative ml-[10px]">
                  <Image src={"/assets/icons/coin.svg"} alt="Coin icon" fill />
                </figure>
              </section>
              <span>Tails</span>
            </section>
          </section>

          {showGameResult && (
            <>
              <span className="gamelobby-title font-[Poppins] mt-[25px] text-center">
                Congratulations Vishisht, you won!
              </span>

              <span
                onClick={() => setShowGamesList(true)}
                className="mt-[30px] w-[108px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]"
              >
                Play Again
              </span>
            </>
          )}
        </section>
      )}
    </section>
  );
};

export default GameLobby;

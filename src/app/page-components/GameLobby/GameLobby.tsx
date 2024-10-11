"use client";
import GameLobbyCard from "@/app/components/GameLobbyCard/GameLobbyCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GameLobby = () => {
  const [showGamesList, setShowGameList] = useState<boolean>(true);
  const [isCreatingGame, setIsCreatingGame] = useState<boolean>(false);
  const [showCreatedModal, setShowCreatedModal] = useState<boolean>(false);
  const [showGameplayModal, setShowGameplayModal] = useState<boolean>(false);
  const [showGameResult, setShowGameResult] = useState<boolean>(false);

  useEffect(() => {
    if (isCreatingGame) {
      setShowGameList(false);
    }
  }, [isCreatingGame]);

  useEffect(() => {
    if (showCreatedModal) {
      setIsCreatingGame(false);
    }
  }, [showCreatedModal]);

  useEffect(() => {
    if (showGameplayModal) {
      setShowCreatedModal(false);
    }
  }, [showGameplayModal]);

  useEffect(() => {
    if (showGameResult) {
      setShowGameResult(true);
    }
  }, [showGameResult]);

  useEffect(() => {
    if (showGamesList) {
      setShowGameResult(false);
      setShowGameplayModal(false);
    }
  }, [showGamesList]);

  const [coinSideSelected, setCoinSideSelected] = useState<"Head" | "Tail">(
    "Head"
  );

  const handleCoinSideSelect = (side: "Head" | "Tail") => {
    // This function sets the selected coin side and resets the other.
    setCoinSideSelected(side);
  };

  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative">
      <h1
        className="gamelobby-title font-[Poppins] font-medium text-[32px] mt-[25px] text-center"
        style={{ visibility: `${showGamesList ? `visible` : `hidden`}` }}
      >
        FlipTON
      </h1>
      <section
        className={`${
          showGamesList ? `mt-[20px]` : `mt-[-10px]`
        } w-full flex justify-between items-center`}
      >
        <section className="flex justify-start items-center">
          <figure className="mr-[10px] relative w-[18px] h-[18px]">
            <Image src={"/assets/icons/avatar.svg"} alt="Avatar icon" fill />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white">
            John Doe
          </span>
        </section>

        <section className="flex justify-start items-center leaderboard-mini-card px-[10px] py-[4px] rounded-[5px]">
          <figure className="mr-[5px] relative w-[16px] h-[16px]">
            <Image
              src={"/assets/icons/leaderboard-2.svg"}
              alt="Leaderboard icon"
              fill
            />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white font-medium">
            Leaderboard
          </span>
        </section>
      </section>

      {showGamesList && (
        <section className="w-full mt-[30px] flex flex-col justify-start items-start mb-[150px]">
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
              type="text"
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

          <span
            onClick={() => setShowCreatedModal(true)}
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
              50
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
                onClick={() => setShowGameList(true)}
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

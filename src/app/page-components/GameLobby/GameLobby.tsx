"use client";
import {
  beginGameSession,
  registerTossEnd,
  registerTossStart,
} from "@/api/game";
import { createNewGame, fetchUserAccount } from "@/api/user";
import GameLobbyCard from "@/app/components/GameLobbyCard/GameLobbyCard";
import TopHeader from "@/app/components/TopHeader/TopHeader";
import { gameType } from "@/types/gameType";
import { User } from "@/types/userType";
import { winnerType } from "@/types/winnerType";
import { toss } from "@/utils/toss";
import { TonConnectUI } from "@tonconnect/ui-react";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./GameLobby.css";

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
  showCreatedMessage: boolean;
  setShowCreatedMessage: Dispatch<SetStateAction<boolean>>;
  games: gameType[];
  tossComplete: boolean;
  setTossComplete: Dispatch<SetStateAction<boolean>>;
  winner: winnerType;
  loadUser: () => Promise<void>;
  myCurrentGame: any;
  setMyCurrentGame: Dispatch<SetStateAction<any>>;
  createGameLoading: boolean;
  setCreateGameLoading: Dispatch<SetStateAction<boolean>>;
  startGameLoading: boolean;
  setStartGameLoading: Dispatch<SetStateAction<boolean>>;
  tossing: boolean;
  setTossing: Dispatch<SetStateAction<boolean>>;
};

const LoaderRing = () => {
  return (
    <div className="lds-dual-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const GameLobby = ({
  tossing,
  setTossing,
  myCurrentGame,
  createGameLoading,
  setCreateGameLoading,
  startGameLoading,
  setStartGameLoading,
  setMyCurrentGame,
  winner,
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
  showCreatedMessage,
  setShowCreatedMessage,
  tossComplete,
  setTossComplete,
  loadUser,
  games,
}: Props) => {
  const [wagerAmount, setWagerAmount] = useState<string | null>(null);
  const [err, setErr] = useState<string>("");
  const [spinning, setSpinning] = useState<boolean>(false);
  const [coinSideSelected, setCoinSideSelected] = useState<"Head" | "Tail">(
    "Head"
  );
  const [replayLoading, setReplayLoading] = useState<boolean>(false);

  let iHaveAGame = games.filter((eachGame) => eachGame.player1Id == chatId);
  if (iHaveAGame.length > 0) {
    setMyCurrentGame(iHaveAGame[0]);
  }

  const handleCoinSideSelect = (side: "Head" | "Tail") => {
    // This function sets the selected coin side and resets the other.
    setCoinSideSelected(side);
  };

  const createGame = async () => {
    if (!wagerAmount) {
      setErr("Wager amount is required");
      return setTimeout(() => setErr(""), 2800);
    }

    if (parseInt(wagerAmount) < 0.5) {
      setErr("Valid wager amount = 0.5 upwards");
      return setTimeout(() => setErr(""), 2800);
    }

    if (createGameLoading) return;
    setCreateGameLoading(true);

    try {
      const createNewGameRes = await createNewGame(
        chatId,
        token,
        parseInt(wagerAmount),
        coinSideSelected
      );
      if (createNewGameRes?.success) {
        setCreateGameLoading(false);
        setUserData({ ...userData, waitingForPlayer2: true });
        setShowCreatedModal(true);
        setShowCreatedMessage(true);
        setTimeout(() => {
          setShowCreatedMessage(false);
        }, 1650);
      } else {
        setCreateGameLoading(false);
      }
    } catch (error) {
      setCreateGameLoading(false);
      console.log(error);
    }
  };

  const beginSession = async () => {
    if (startGameLoading) return;
    setStartGameLoading(true);
    try {
      const beginSessionRes = await beginGameSession(chatId, "");
      if (beginSessionRes?.success) {
        setStartGameLoading(false);
        setUserData({ ...userData, waitingForPlayer2: false });
        setShowGameplayModal(true);
      } else {
        setStartGameLoading(false);
      }
    } catch (error) {
      setStartGameLoading(false);
    }
  };

  const handleToss = async () => {
    if (winner) return; //If winner object was populated, the game has ended
    if (spinning || tossing) return;
    try {
      const gameResult = toss();
      setSpinning(true); //Start spin
      await registerTossStart(chatId, "");
      setTimeout(() => {}, 7000);
      let tossResult: "Head" | "Tail" = gameResult == 1 ? "Head" : "Tail";
      const registerTossEndRes = await registerTossEnd(chatId, tossResult, "");
      if (registerTossEndRes?.success) {
        setSpinning(false); //End spin
        setTossing(false);
      }
    } catch (error) {}
  };

  const handlePlayAgain = async () => {
    if (replayLoading) return;
    try {
      setReplayLoading(true);
      await loadUser();
      setReplayLoading(false);
      setShowGameplayModal(false);
      setShowGamesList(true);
    } catch (error) {}
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
          {games.length == 0 && (
            <section className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
              <p className="gamelobby-title font-[Poppins] mb-[20px] font-semibold text-[20px] text-center">
                No open games yet
              </p>

              <span
                onClick={() => setIsCreatingGame(true)}
                className="w-[151px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]"
              >
                Create New Game
              </span>
            </section>
          )}
          {games.map((eachGame, i) => {
            return (
              <GameLobbyCard
                chatId={chatId}
                key={i}
                setIsCreatingGame={setIsCreatingGame}
                gameDetails={eachGame}
              />
            );
          })}
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
            className={`${
              createGameLoading && `opacity-[50%]`
            } w-[151px] h-[32px] my-[40px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]`}
          >
            <span className={`${createGameLoading && `mr-[8px]`}`}>
              {createGameLoading ? `Creating game` : `Create Game`}
            </span>
            {createGameLoading && <div className="loader-2"></div>}
          </span>
        </section>
      )}

      {showCreatedModal && (
        <section className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
          {/* Show this immediately after game creation */}
          {showCreatedMessage && (
            <>
              <section className="flex justify-start items-center mb-[5px]">
                <span className="font-[Poppins] text-[36px] font-medium text-white mr-[10px]">
                  {wagerAmount}
                </span>
                <figure className="w-[32px] h-[32px] relative">
                  <Image src={"/assets/icons/coin.png"} alt="Coin icon" fill />
                </figure>
              </section>

              <span className="gamelobby-title font-[Poppins] font-medium text-[20px] text-center mb-[20px]">
                Game created successfully!
              </span>

              <LoaderRing />
            </>
          )}
        </section>
      )}

      {/* Show this after game creation message disappears (userData?._id prevents reveal until account loads) */}
      {!showCreatedMessage && userData?._id && userData.waitingForPlayer2 && (
        <section className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
          <>
            <figure className="w-[75px] h-[75px] relative rounded-[50px] border-[2px] border-[#FFC047]">
              <Image
                src={avatar ? avatar : `/assets/images/dp.svg`}
                alt="User photo"
                fill
                className="rounded-[inherit]"
              />
            </figure>
            <span className="font-medium font-[Poppins] mt-[10px] text-white">
              You
            </span>
            <p className="gamelobby-title font-[Poppins] font-semibold my-[20px] text-[20px] text-center">
              {userData.player2HasJoined
                ? `Player Found`
                : `Waiting for player 2`}
            </p>

            {userData.player2HasJoined && (
              <>
                <figure className="w-[75px] h-[75px] relative rounded-[50px] border-[2px] border-[#D47332]">
                  <Image
                    src={
                      userData.player2Photo
                        ? userData.player2Photo
                        : `/assets/images/dp.svg`
                    }
                    alt="User photo"
                    fill
                    className="rounded-[inherit]"
                  />
                </figure>
                <span className="font-medium font-[Poppins] mt-[10px] text-white">
                  {userData.player2Name}
                </span>
                {iHaveAGame ? (
                  <span
                    onClick={beginSession}
                    className={`${
                      startGameLoading && `opacity-[50%]`
                    } mt-[50px] w-[151px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]`}
                  >
                    <span className={`${startGameLoading && `mr-[10px]`}`}>
                      {startGameLoading ? `Starting Game` : `Start Game`}
                    </span>
                    {startGameLoading && <div className="loader-2"></div>}
                  </span>
                ) : (
                  <p className="text-purple-500 mt-[15px]">
                    Waiting for player 1 to start the game
                  </p>
                )}
              </>
            )}
          </>
        </section>
      )}

      {showGameplayModal && (
        <section className="w-full h-full top-0 left-0 absolute flex flex-col justify-center items-center px-[20px]">
          <figure
            className={`w-[112px] h-[112px] relative ${
              spinning && `spin-coin`
            } ${tossing && `spin-coin`}`}
          >
            <Image src={"/assets/icons/coin.svg"} alt="Coin icon" fill />
          </figure>

          {myCurrentGame && !winner && (
            <span
              onClick={handleToss}
              className={`mt-[30px] w-[108px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px] ${
                winner ? `opacity-[50%]` : `opacity-[100%]`
              } ${(spinning || tossing) && `opacity-[50%]`} `}
            >
              {spinning || tossing ? "Tossing..." : "Click To Toss"}
            </span>
          )}

          {winner && (
            <span
              onClick={handleToss}
              className="opacity-[50%] mt-[30px] w-[108px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]"
            >
              {winner?.winningSide}
            </span>
          )}

          {myCurrentGame && (
            <section className="w-full flex justify-between items-start mt-[35px]">
              <section className="flex flex-col justify-center items-start font-[Poppins] text-white">
                <span>{myCurrentGame.player1Name}</span>
                <section className="flex items-center justify-start">
                  <span className="font-medium">
                    {formatNumberWithCommas(myCurrentGame.wagerAmount)}
                  </span>
                  <figure className="w-[16px] h-[16px] relative ml-[5px]">
                    <Image
                      src={"/assets/icons/coin.svg"}
                      alt="Coin icon"
                      fill
                    />
                  </figure>
                </section>
                <span>{myCurrentGame.creatorChosenSide}</span>
              </section>

              <span className="text-[10px] font-medium font-[Poppins] text-white">
                vs
              </span>

              <section className="flex flex-col justify-center items-start font-[Poppins] text-white">
                <span>{myCurrentGame.player2Name}</span>
                <section className="flex items-center justify-start">
                  <span className="font-medium">
                    {myCurrentGame.wagerAmount}
                  </span>
                  <figure className="w-[16px] h-[16px] relative ml-[5px]">
                    <Image
                      src={"/assets/icons/coin.svg"}
                      alt="Coin icon"
                      fill
                    />
                  </figure>
                </section>
                <span>
                  {myCurrentGame.creatorChosenSide == "Head" ? `Tail` : `Head`}
                </span>
              </section>
            </section>
          )}

          {winner && (
            <>
              <span className="gamelobby-title font-[Poppins] mt-[25px] text-center">
                {winner.winnerId == chatId
                  ? `Congratulations ${winner.winnerName}, you won!`
                  : `Hard luck ${winner.loserName}, you lost!`}
              </span>

              <span
                onClick={handlePlayAgain}
                className={`${
                  replayLoading && `opacity-[50%]`
                } mt-[30px] w-[108px] h-[32px] flex justify-center items-center rounded-[4px] text-[#381E72] bg-[#D0BCFF] font-[Roboto] font-medium text-[14px]`}
              >
                <span className={`${replayLoading && `mr-[10px]`}`}>Play Again</span>
                {replayLoading && <div className="loader-2"></div>}
              </span>
            </>
          )}
        </section>
      )}
    </section>
  );
};

export default GameLobby;

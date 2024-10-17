"use client";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import GameLobby from "./page-components/GameLobby/GameLobby";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";
import { GameHistory, Transaction, User } from "@/types/userType";
import { fetchUserAccount, updateWalletAddress } from "@/api/user";
import { setName } from "@/helpers/setName";
import { gameType } from "@/types/gameType";
import { botSocketHandler } from "@/helpers/botSocketHandler";
import Image from "next/image";
import { fetchOpenGames } from "@/api/game";
import { winnerType } from "@/types/winnerType";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import { initClosingBehavior, retrieveLaunchParams } from "@tma.js/sdk";
import { useInitData, useViewport } from "@tma.js/sdk-react";
import { leaderboardType } from "@/types/leaderboardType";
import { fetchLeaderboard } from "@/api/leaderboard";

const Home = () => {
  // const [closingBehavior] = initClosingBehavior();
  // closingBehavior.enableConfirmation();
  // const viewport = useViewport();
  // const data = useInitData(); // Destructuring initData
  // const chatId = data?.user?.id as number;
  // viewport?.expand();
  // const { initDataRaw } = retrieveLaunchParams();
  // let token = initDataRaw as string

  // let chatId = 6450051353;
  let chatId = 1645873626;
  let token = "";
  const [games, setGames] = useState<gameType[]>([]);
  const [showGamesList, setShowGamesList] = useState<boolean>(true);
  const [isCreatingGame, setIsCreatingGame] = useState<boolean>(false);
  const [showCreatedModal, setShowCreatedModal] = useState<boolean>(false);
  const [showGameplayModal, setShowGameplayModal] = useState<boolean>(false);
  const [showGameResult, setShowGameResult] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>(null);
  const [showCreatedMessage, setShowCreatedMessage] = useState<boolean>(false);
  const [player2HasJoined, setPlayer2HasJoined] = useState<boolean>(false);
  const [tossComplete, setTossComplete] = useState<boolean>(false);
  const [winner, setWinner] = useState<winnerType>(null);
  const [myCurrentGame, setMyCurrentGame] = useState<any>(null);
  const [tossing, setTossing] = useState<boolean>(false);
  const [player1Details, setPlayer1Details] = useState<{
    photo: string;
    name: string;
  } | null>(null);
  const [showPlayer2JoinScreen, setShowPlayer2JoinScreen] =
    useState<boolean>(false);
  const [dataForPlayer2, setDataForPlayer2] = useState<{
    wagerAmount: number;
    creatorChosenSide: "Head" | "Tail";
  } | null>(null);

  // useEffect(() => {
  //   if (userData?.waitingForPlayer2) {

  //   }
  // }, [userData?.waitingForPlayer2]);

  // useEffect(() => {
  //   if (player1Details) {
  //     setShowGamesList(false);
  //     setShowPlayer2JoinScreen(true);
  //   }
  // }, [player1Details]);

  useEffect(() => {
    if (dataForPlayer2) {
      setShowGameplayModal(true);
    }
  }, [dataForPlayer2]);

  useEffect(() => {
    if (userData?.waitingForPlayer2) {
      setShowGamesList(false);
    }

    if (userData?.gameOngoing) {
      setShowGamesList(false);
      setShowGameplayModal(true);
    }

    //If user joined a game as player 2
    if (userData?.player2Name || userData?.player1Name) {
      setShowGamesList(false);
    }
  }, [userData]);

  useEffect(() => {
    if (isCreatingGame) {
      setShowGamesList(false);
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

  const gamesRef = useRef<gameType[] | null>([]);
  useEffect(() => {
    gamesRef.current = games;
  }, [games]);

  const loadUser = async () => {
    try {
      const loadUserRes = await fetchUserAccount(chatId, "");
      if (loadUserRes?.data) {
        setUserData(loadUserRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const botSocketRef = useRef<any>(null); // Use ref to store the socket

  //CONNECT TO SOCKET BOT SERVER
  useEffect(() => {
    // Initialize the WebSocket connection
    const socket = io(process.env.NEXT_PUBLIC_BOT_SERVER_URL as string);
    botSocketRef.current = socket;
    botSocketHandler(
      socket,
      gamesRef,
      chatId as number,
      setGames,
      setUserData,
      setWinner,
      setTossing,
      setDataForPlayer2
    );

    // Cleanup on unmount
    return () => {
      if (botSocketRef.current) {
        botSocketRef.current.disconnect();
        botSocketRef.current = null; // Clear ref on disconnect
      }
    };
  }, []);

  const walletAddress = useTonAddress();
  const { state, open, close } = useTonConnectModal();

  const [tonConnectUI] = useTonConnectUI();
  // console.log(tonConnectUI.connected);

  const [walletLoaded, setWalletLoaded] = useState<boolean>(false);

  const initWallet = () => {
    // Correctly typing the interval ID for both Node.js and browser
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      let loader = document.querySelector(".go121314943");
      console.log(loader);
      if (!loader) {
        setWalletLoaded(true);
        clearInterval(intervalId); // Clear the interval to stop it
      }
    }, 1000);
  };

  useEffect(() => {
    initWallet();
  }, []);

  const handleWalletClick = () => {
    if (!tonConnectUI.connected) {
      open();
    } else {
      tonConnectUI.disconnect();
    }
  };

  const [walletErr, setWalletErr] = useState<string>("");

  const createGameWithPencil = () => {
    if (!tonConnectUI.connected) {
      setWalletErr("Please connect your wallet to join/start a game.");
      return setTimeout(() => setWalletErr(""), 2800);
    }

    setIsCreatingGame(true);
  };

  const loadOpenGames = async () => {
    try {
      const loadOpenGamesRes = await fetchOpenGames(token as string);
      if (loadOpenGamesRes?.success) {
        console.log(loadOpenGamesRes);
        setGames(loadOpenGamesRes.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOpenGames();
  }, []);

  const [leaderboard, setLeaderboard] = useState<leaderboardType[]>([]);
  const [rank, setRank] = useState<number>(0);

  const loadLeaderboard = async () => {
    try {
      const loadLeaderboardRes = await fetchLeaderboard(token as string);
      if (loadLeaderboardRes?.success) {
        setLeaderboard(loadLeaderboardRes.data);
        const myRank = loadLeaderboardRes.data.findIndex(
          (user: leaderboardType) => user.chatId === chatId
        );
        setRank(myRank + 1);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const [currentPage, setCurrentPage] = useState<string>("Game Lobby");
  const [createGameLoading, setCreateGameLoading] = useState<boolean>(false);
  const [startGameLoading, setStartGameLoading] = useState<boolean>(false);

  const walletAddressCronJob = async () => {
    const userWalletAddress = userData?.walletAddress;

    //Update Wallet address in db
    if (tonConnectUI.connected) {
      if (!userWalletAddress || userWalletAddress != walletAddress) {
        //Update wallet address
        await updateWalletAddress(chatId, walletAddress, "");

        //Repeat after 2 minutes
        setTimeout(() => {
          walletAddressCronJob();
        }, 1000 * 60);
      }
    }
  };

  return (
    <main className="w-full h-[100vh] flex flex-col justify-start items-center">
      <TonConnectButton className="hidden" />
      <Navbar
        photo={userData?.photo as string}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* New game card */}

      {walletLoaded && ( //Uncomment this before push
        <>
          {tonConnectUI.connected && !isCreatingGame && showGamesList && (
            <section
              onClick={createGameWithPencil}
              className="z-[99] fixed bottom-[100px] right-[22px] w-[60px] h-[60px] bg-[#2B2930] rounded-[17px] flex justify-center items-center"
            >
              <figure className="relative w-[20px] h-[20px]">
                <Image
                  src={"/assets/icons/new-game.svg"}
                  alt={"New game icon"}
                  fill
                />
              </figure>
            </section>
          )}
        </>
      )}

      {/* <section
        onClick={createGameWithPencil}
        className="z-[99] fixed bottom-[100px] right-[22px] w-[60px] h-[60px] bg-[#2B2930] rounded-[17px] flex justify-center items-center"
      >
        <figure className="relative w-[20px] h-[20px]">
          <Image
            src={"/assets/icons/new-game.svg"}
            alt={"New game icon"}
            fill
          />
        </figure>
      </section> */}

      {!userData?._id && <SplashScreen />}

      {userData?._id && (
        <>
          {currentPage == "Game Lobby" && (
            <GameLobby
              setDataForPlayer2={setDataForPlayer2}
              setWalletErr={setWalletErr}
              dataForPlayer2={dataForPlayer2}
              showPlayer2JoinScreen={showPlayer2JoinScreen}
              player1Details={player1Details}
              setTossing={setTossing}
              tossing={tossing}
              startGameLoading={startGameLoading}
              setStartGameLoading={setStartGameLoading}
              createGameLoading={createGameLoading}
              setCreateGameLoading={setCreateGameLoading}
              myCurrentGame={myCurrentGame}
              setMyCurrentGame={setMyCurrentGame}
              loadUser={loadUser}
              winner={winner}
              setWinner={setWinner}
              setTossComplete={setTossComplete}
              tossComplete={tossComplete}
              games={games}
              setShowCreatedMessage={setShowCreatedMessage}
              showCreatedMessage={showCreatedMessage}
              setUserData={setUserData}
              userData={userData}
              walletErr={walletErr}
              walletAddress={walletAddress}
              tonConnectUI={tonConnectUI}
              walletLoaded={walletLoaded}
              handleWalletClick={handleWalletClick}
              chatId={chatId}
              token={token}
              setCurrentPage={setCurrentPage}
              avatar={userData?.photo as string}
              name={setName(userData)}
              isCreatingGame={isCreatingGame}
              setIsCreatingGame={setIsCreatingGame}
              setShowCreatedModal={setShowCreatedModal}
              setShowGameResult={setShowGameResult}
              setShowGameplayModal={setShowGameplayModal}
              setShowGamesList={setShowGamesList}
              showCreatedModal={showCreatedModal}
              showGameResult={showGameResult}
              showGameplayModal={showGameplayModal}
              showGamesList={showGamesList}
            />
          )}

          {currentPage == "Leaderboard" && (
            <Leaderboard
              rank={rank}
              walletAddress={walletAddress}
              tonConnectUI={tonConnectUI}
              walletLoaded={walletLoaded}
              handleWalletClick={handleWalletClick}
              chatId={chatId as number}
              leaderboard={leaderboard}
              balance={userData?.balance as number}
              avatar={userData?.photo as string}
              name={setName(userData)}
            />
          )}

          {currentPage == "History" && (
            <History
              showGamesList={showGamesList}
              walletAddress={walletAddress}
              tonConnectUI={tonConnectUI}
              walletLoaded={walletLoaded}
              handleWalletClick={handleWalletClick}
              avatar={userData?.photo as string}
              name={setName(userData)}
              history={userData?.history as GameHistory[]}
            />
          )}

          {currentPage == "Profile" && (
            <Profile
              rank={rank}
              walletAddress={walletAddress}
              tonConnectUI={tonConnectUI}
              walletLoaded={walletLoaded}
              handleWalletClick={handleWalletClick}
              avatar={userData?.photo as string}
              balance={userData?.walletBalance as string}
              name={setName(userData)}
              username={userData?.username as string}
              transactions={userData?.transactions as Transaction[]}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Home;

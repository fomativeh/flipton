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
import { Transaction, User } from "@/types/userType";
import { fetchUserAccount } from "@/api/user";
import { setName } from "@/helpers/setName";
import { gameType } from "@/types/gameType";
import { botSocketHandler } from "@/helpers/botSocketHandler";

const Home = () => {
  let chatId = 6450051353;
  let token = ""
  const [userData, setUserData] = useState<User>(null);
  const [games, setGames] = useState<gameType[]>([]);
  const [showGamesList, setShowGamesList] = useState<boolean>(true);
  const [isCreatingGame, setIsCreatingGame] = useState<boolean>(false);
  const [showCreatedModal, setShowCreatedModal] = useState<boolean>(false);
  const [showGameplayModal, setShowGameplayModal] = useState<boolean>(false);
  const [showGameResult, setShowGameResult] = useState<boolean>(false);

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
        console.log(loadUserRes.data);
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
    botSocketHandler(socket, gamesRef, chatId as number, setGames);

    // Cleanup on unmount
    return () => {
      if (botSocketRef.current) {
        botSocketRef.current.disconnect();
        botSocketRef.current = null; // Clear ref on disconnect
      }
    };
  }, []);

  const [currentPage, setCurrentPage] = useState<string>("Game Lobby");
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage == "Game Lobby" && (
        <GameLobby
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
          balance={userData?.balance as number}
          avatar={userData?.photo as string}
          name={setName(userData)}
        />
      )}

      {currentPage == "Profile" && (
        <Profile
          avatar={userData?.photo as string}
          balance={userData?.balance as number}
          name={setName(userData)}
          username={userData?.username as string}
          transactions={userData?.transactions as Transaction[]}
        />
      )}

      {currentPage == "History" && <History />}
    </main>
  );
};

export default Home;

"use client";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import GameLobby from "./page-components/GameLobby/GameLobby";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<string>("Game Lobby");
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage == "Game Lobby" && <GameLobby />}

      {currentPage == "Leaderboard" && <Leaderboard />}

      {currentPage == "Profile" && <Profile />}

      {currentPage == "History" && <History/>}
    </main>
  );
};

export default Home;

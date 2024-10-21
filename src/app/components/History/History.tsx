import { GameHistory, Transaction } from "@/types/userType";
import Image from "next/image";
import React from "react";
import TopHeader from "../TopHeader/TopHeader";
import { TonConnectUI } from "@tonconnect/ui-react";

// type Props = {
//   avatar: string;
//   balance: number;
//   transactions: Transaction;
//   name: string;
//   username: string;
// };
type PageProps = {
  history: GameHistory[];
  walletAddress?: string;
  tonConnectUI: TonConnectUI;
  walletLoaded: boolean;
  name: string;
  handleWalletClick: () => void;
  avatar: string;
  showGamesList: boolean;
};

const formatDate = (dateStr: string): string => {
  // Convert the date string to a Date object
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const History = (props: PageProps) => {
  const {
    history,
    avatar,
    handleWalletClick,
    name,
    showGamesList,
    tonConnectUI,
    walletLoaded,
    walletAddress,
  } = props;
  return (
    <section className="pt-[30px] page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative flex flex-col justify-start items-center pb-[150px]">
      <TopHeader
        walletAddress={walletAddress as string}
        tonConnectUI={tonConnectUI}
        walletLoaded={walletLoaded}
        name={name as string}
        handleWalletClick={handleWalletClick}
        avatar={avatar}
        showGamesList={showGamesList}
      />

      <section className="mt-[30px] w-full flex justify-between items-center flex-wrap">
        {history?.length > 0 &&
          history?.map((eachHistory, i) => {
            return (
              <section
                key={i}
                className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white"
              >
                <section className="w-full flex justify-start items-center mb-[10px]">
                  <figure className="mr-[15px] relative w-[20px] h-[20px]">
                    <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
                  </figure>
                  <span>{eachHistory.won ? `Won` : `Lost`}</span>
                </section>

                <section className="w-full flex justify-start items-center mb-[10px]">
                  <figure className="mr-[15px] relative w-[20px] h-[20px] rounded-[50px]">
                    <Image
                      src={
                        eachHistory.opponentPhoto
                          ? eachHistory.opponentPhoto
                          : "/assets/icons/user.svg"
                      }
                      alt="User Photo"
                      fill
                      className="rounded-[inherit]"
                    />
                  </figure>
                  <span>{eachHistory.opponent}</span>
                </section>

                <section className="w-full flex justify-start items-center mb-[10px]">
                  <figure className="mr-[15px] relative w-[20px] h-[20px]">
                    <Image
                      src={"/assets/icons/coin-2.svg"}
                      alt="Coin icon b"
                      fill
                    />
                  </figure>
                  <span>{eachHistory.amount}</span>
                </section>

                <section className="w-full flex justify-start items-center">
                  <figure className="mr-[15px] relative w-[20px] h-[20px]">
                    <Image
                      src={"/assets/icons/calender.svg"}
                      alt="Calender icon"
                      fill
                    />
                  </figure>
                  <span>{formatDate(eachHistory.date)}</span>
                </section>
              </section>
            );
          })}


          {history.length==0 && (
            <section className="font-[Poppins] absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
             <span className="gamelobby-title font-bold text-[20px] text-center">
              No history yet
            </span>

            <p className="text-white mt-[20px] text-[14px]">Play more games to see history here.</p>
            </section>
          )}
      </section>
    </section>
  );
};

export default History;

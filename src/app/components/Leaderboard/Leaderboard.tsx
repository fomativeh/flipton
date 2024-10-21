"use client";
import Image from "next/image";
import React, { useState } from "react";
import { formatNumberWithCommas } from "fomautils";
import { leaderboardType } from "@/types/leaderboardType";
import { TonConnectUI } from "@tonconnect/ui-react";

type Props = {
  avatar: string;
  name: String;
  balance: number;
  leaderboard: leaderboardType[];
  handleWalletClick: () => void;
  walletLoaded: boolean;
  tonConnectUI: TonConnectUI;
  walletAddress: string;
  chatId: number;
  rank: number;
};

const Leaderboard = ({
  avatar,
  name,
  balance,
  chatId,
  rank,
  walletLoaded,
  tonConnectUI,
  handleWalletClick,
  walletAddress,
  leaderboard,
}: Props) => {
  let myAccount = leaderboard.filter((each) => each.chatId == chatId);
  let amountEarned = myAccount[0].totalAmountWon;
  return (
    <section className="pt-[30px] page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative flex flex-col justify-start items-center">
      <section className={`w-full flex justify-between items-center mb-[25px]`}>
        <section className="flex justify-start items-center">
          <figure className="mr-[10px] relative w-[18px] h-[18px] rounded-[50px]">
            <Image
              src={avatar ? avatar : `/assets/icons/avatar.svg`}
              alt="Avatar icon"
              fill
              className="rounded-[inherit]"
            />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white">{name}</span>
        </section>

        <section
          className={`leaderboard-mini-card flex justify-start items-center ${
            walletLoaded ? `px-[8px]` : `px-[4px]`
          } py-[4px] rounded-[5px]`}
        >
          {!walletLoaded && (
            <>
              <figure className="mr-[5px] relative w-[20px] h-[20px]">
                <Image
                  src={"/assets/images/ton.svg"}
                  alt="Leaderboard icon"
                  fill
                />
              </figure>

              <div className="loader-2"></div>
            </>
          )}
          {walletLoaded && (
            <>
              {tonConnectUI.connected ? (
                <>
                  <figure className="mr-[5px] relative w-[20px] h-[20px]">
                    <Image src={"/assets/images/ton.svg"} alt="Ton icon" fill />
                  </figure>
                  <span className="font-[Poppins] text-[12px] text-white font-medium">
                    {walletAddress.slice(0, 3) +
                      "..." +
                      walletAddress.slice(
                        walletAddress.length - 4,
                        walletAddress.length - 1
                      )}
                  </span>
                </>
              ) : (
                <span
                  className="font-[Poppins] text-[12px] text-white font-medium"
                  onClick={handleWalletClick}
                >
                  Connect Wallet
                </span>
              )}
            </>
          )}
        </section>
      </section>

      <section className="mb-[50px] mt-[15px] fade-card w-full rounded-[8px] py-[17px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        <section className="w-full flex justify-between items-center px-[20px]">
          <span>My Rank</span>
          <span>#{formatNumberWithCommas(rank)}</span>
        </section>
        <div className="bg-[#8E2DE2] w-full my-[12px] h-[1px]"></div>
        <section className="w-full flex justify-between items-center px-[20px]">
          <span>Amount Earned</span>
          <span>{amountEarned} TON</span>
        </section>
      </section>

      <section className="mt-[10px] w-[90%] flex justify-between items-center relative">
        {leaderboard.length > 1 && (
          <section className="flex flex-col justify-center items-center">
            <figure className="relative w-[60px] h-[60px] mb-[10px] rounded-[50px]">
              <Image
                src={
                  leaderboard[1].photo
                    ? leaderboard[1].photo
                    : "/assets/images/dp.svg"
                }
                alt="User Photo"
                fill
                className="rounded-[inherit]"
              />
            </figure>
            <span className="font-medium font-[Poppins] text-[12px] text-white">
              {leaderboard[1].totalAmountWon} TON
            </span>
            <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
              2
            </span>
          </section>
        )}

        <section className="w-full h-full absolute top-[-35px] left-0 flex justify-center ">
          <section className="flex flex-col justify-center items-center">
            <figure className="relative w-[60px] h-[60px] mb-[10px] rounded-[50px]">
              <Image
                src={
                  leaderboard[0].photo
                    ? leaderboard[0].photo
                    : "/assets/images/dp.svg"
                }
                alt="User Photo"
                fill
                className="rounded-[inherit]"
              />
            </figure>
            <span className="font-medium font-[Poppins] text-[12px] text-white">
              {leaderboard[0].totalAmountWon} TON
            </span>
            <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
              1
            </span>
          </section>
        </section>

        {leaderboard.length > 2 && (
          <section className="flex flex-col justify-center items-center">
            <figure className="relative w-[60px] h-[60px] mb-[10px] rounded-[50px]">
              <Image
                src={
                  leaderboard[2].photo
                    ? leaderboard[2].photo
                    : "/assets/images/dp.svg"
                }
                alt="User Photo"
                fill
                className="rounded-[inherit]"
              />
            </figure>
            <span className="font-medium font-[Poppins] text-[12px] text-white">
              {leaderboard[2].totalAmountWon} TON
            </span>
            <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
              3
            </span>
          </section>
        )}
      </section>

      <section className="mb-[150px] mt-[25px] fade-card w-full rounded-[8px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        {leaderboard.length > 0 &&
          leaderboard.map((eachPerson, i) => {
            return (
              <section
                key={i}
                className={`w-full flex justify-between items-center py-[12px] px-[12px] ${
                  i != leaderboard.length - 1 &&
                  `border-b-[2px] border-b-[#8E2DE2]`
                } `}
              >
                <section className="flex items-center justify-start">
                  <span className="mr-[8px]">{i + 1}</span>
                  <span>{eachPerson.name}</span>
                </section>
                <span>{eachPerson.totalAmountWon} TON</span>
              </section>
            );
          })}

        {leaderboard.length == 0 && (
          <p className="text-white text-[12px] my-[15px]">
            Top players will appear here.
          </p>
        )}
      </section>
    </section>
  );
};

export default Leaderboard;

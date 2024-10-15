import { Transaction } from "@/types/userType";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React from "react";

type Props = {
  avatar: string;
  balance: number;
  transactions: Transaction[];
  name: string;
  username: string;
};

const Profile= ({avatar,balance,transactions,name, username}:Props) => {
  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] flex flex-col justify-start items-center overflow-y-auto relative pb-[150px] ">
      <section className="py-[20px] mb-[10px] mt-[25px] fade-card w-full rounded-[8px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        <figure className="w-[60px] h-[60px] relative rounded-[50px]">
        <Image src={avatar? avatar : `/assets/images/dp.svg`} alt="Profile pic" fill className="rounded-[inherit]" />

        </figure>
        <span className="gamelobby-title font-[Poppins] font-medium text-white mt-[4px] text-[20px]">
          {name}
        </span>
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          @{username}
        </span>
        <span className="font-[Poppins] text-[12px] font-medium text-white">
          #1098
        </span>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-between items-center font-[Poppins] font-medium text-[14px] text-white">
        <span>My Wallet</span>
        <section className="flex justify-start items-center py-[4px] rounded-[5px]">
          <figure className="mr-[5px] relative w-[20px] h-[20px]">
            <Image src={"/assets/images/ton.svg"} alt="Leaderboard icon" fill />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white font-medium">
            Q1xk...d093
          </span>
        </section>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[14px] text-white">
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          My Balance
        </span>

        <span className="font-semibold text-[24px] text-white">{formatNumberWithCommas(balance)} TON</span>

        <section className="w-full flex justify-start items-center mt-[15px]">
          <section className="flex justify-center items-center w-[125px] h-[32px] bg-[#D0BCFF] rounded-[4px]">
            <figure className="mr-[5px] relative w-[11px] h-[11px]">
              <Image
                src={"/assets/icons/add-money.svg"}
                alt="Transfer icon"
                fill
              />
            </figure>
            <span className="text-[#381E72] font-medium text-[14px]">
              Add Money
            </span>
          </section>

          <section className="ml-[15px] flex justify-center items-center w-[105px] h-[32px] bg-[#D0BCFF] rounded-[4px]">
            <figure className="mr-[5px] relative w-[11px] h-[11px]">
              <Image
                src={"/assets/icons/transfer.svg"}
                alt="Transfer icon"
                fill
              />
            </figure>
            <span className="text-[#381E72] font-medium text-[14px]">
              Transfer
            </span>
          </section>
        </section>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex flex-col justify-start items-start font-[Poppins] font-medium text-[14px] text-white">
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          Transactions
        </span>

        <section className="w-full flex flex-col justify-start items-center mt-[10px] font-[Poppins] text-[12px] text-white">
          <section className="my-[3px] flex w-full justify-between items-center">
            <span>Yesterday 06:45 PM</span>
            <span>-$70</span>
          </section>

          <section className="my-[3px] flex w-full justify-between items-center">
            <span>Yesterday 06:45 PM</span>
            <span>-$7020</span>
          </section>

          <section className="my-[3px] flex w-full justify-between items-center">
            <span>Yesterday 06:45 PM</span>
            <span>-$1570</span>
          </section>

          <section className="my-[3px] flex w-full justify-between items-center">
            <span>Yesterday 06:45 PM</span>
            <span>-$37000</span>
          </section>

          <section className="my-[3px] flex w-full justify-between items-center">
            <span>Yesterday 06:45 PM</span>
            <span>-$70</span>
          </section>
        </section>

        <span className="w-full text-center mt-[10px] mb-[3px] text-[#D0BCFF] font-[Poppins] text-[12px] font-medium underline">
          View All
        </span>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-start items-center font-[Poppins] font-medium text-[14px] text-white">
        <figure className="mr-[7px] relative w-[15px] h-[15px]">
          <Image src={"/assets/icons/help.svg"} alt="Help icon" fill />
        </figure>

        <span className="font-medium text-[14px] font-[Poppins] text-white">Help Centre</span>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-start items-center font-[Poppins] font-medium text-[14px] text-white">
        <figure className="mr-[7px] relative w-[15px] h-[15px]">
          <Image src={"/assets/icons/logout.svg"} alt="Logout icon" fill />
        </figure>

        <span className="font-medium text-[14px] font-[Poppins] text-white">Log out</span>
      </section>
    </section>
  );
};

export default Profile;

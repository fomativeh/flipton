import { Transaction } from "@/types/userType";
import { postEvent } from "@tma.js/sdk-react";
import { TonConnectUI } from "@tonconnect/ui-react";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function formatDateRelative(dateStr: string): string {
  const inputDate = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string");
  }

  const now = new Date();
  const diffInMs = now.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Format the time as HH:MM AM/PM
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = inputDate.toLocaleTimeString("en-US", options);

  if (diffInDays === 0) {
    return `Today ${formattedTime}`;
  } else if (diffInDays === 1) {
    return `Yesterday ${formattedTime}`;
  } else {
    // For cases where the date is more than 1 day old, just return the full date with time
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = inputDate.toLocaleDateString("en-US", dateOptions);
    return `${formattedDate} ${formattedTime}`;
  }
}

type Props = {
  avatar: string;
  balance: string;
  transactions: Transaction[];
  name: string;
  username: string;
  handleWalletClick: () => void;
  walletLoaded: boolean;
  tonConnectUI: TonConnectUI;
  walletAddress: string;
  rank: number;
};

const Profile = ({
  walletLoaded,
  tonConnectUI,
  handleWalletClick,
  walletAddress,
  avatar,
  balance,
  transactions,
  name,
  username,
  rank,
}: Props) => {
  let moreThan5 = transactions.length > 5 ? true : false;

  const trimmedTransactions = moreThan5
    ? transactions.slice(0, 5)
    : transactions;

  const [transactionsToRender, setTransactionsToRender] =
    useState<any[]>(trimmedTransactions);

  const [expand, setExpand] = useState<boolean>(false);

  useEffect(() => {
    if (expand) {
      setTransactionsToRender(transactions);
    } else {
      setTransactionsToRender(trimmedTransactions);
    }
  }, [expand]);

  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] flex flex-col justify-start items-center overflow-y-auto relative pb-[150px] ">
      <section className="py-[20px] mb-[10px] mt-[25px] fade-card w-full rounded-[8px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        <figure className="w-[60px] h-[60px] relative rounded-[50px]">
          <Image
            src={avatar ? avatar : `/assets/images/dp.svg`}
            alt="Profile pic"
            fill
            className="rounded-[inherit]"
          />
        </figure>
        <span className="gamelobby-title font-[Poppins] font-medium text-white mt-[4px] text-[20px]">
          {name}
        </span>
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          @{username}
        </span>
        <span className="font-[Poppins] text-[12px] font-medium text-white">
          #{formatNumberWithCommas(rank)}
        </span>
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-between items-center font-[Poppins] font-medium text-[14px] text-white">
        <span>My Wallet</span>
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

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[14px] text-white">
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          My Balance
        </span>

        <span className="font-semibold text-[24px] text-white">
          {parseFloat(balance)} TON
        </span>

        {/* <section className="w-full flex justify-start items-center mt-[15px]">
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
        </section> */}
      </section>

      <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex flex-col justify-start items-start font-[Poppins] font-medium text-[14px] text-white">
        <span className="font-[Poppins] text-[12px] text-[#AEACB0] opacity-[70%]">
          Transactions
        </span>

        <section className="w-full flex flex-col justify-start items-center mt-[10px] font-[Poppins] text-[12px] text-white">
          {transactionsToRender.length > 0 &&
            transactionsToRender.map((eachTransaction, i) => {
              return (
                <section
                  key={i}
                  className="my-[3px] flex w-full justify-between items-center"
                >
                  <span>{formatDateRelative(eachTransaction.date)}</span>
                  <span>
                    {eachTransaction.transactionType == "Debit" ? "-" : "+"}
                    {eachTransaction.amount} TON
                  </span>
                </section>
              );
            })}

          {transactions.length == 0 && (
            <p className="text-white mt-[5px] text-[12px]">
              Play more games to see transactions here.
            </p>
          )}
        </section>

        {moreThan5 && (
          <span
            onClick={() => setExpand(!expand)}
            className="w-full text-center mt-[10px] mb-[3px] text-[#D0BCFF] font-[Poppins] text-[12px] font-medium underline"
          >
            {expand ? "View Less" : "View All"}
          </span>
        )}
      </section>

      {/* <section className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-start items-center font-[Poppins] font-medium text-[14px] text-white">
        <figure className="mr-[7px] relative w-[15px] h-[15px]">
          <Image src={"/assets/icons/help.svg"} alt="Help icon" fill />
        </figure>

        <span className="font-medium text-[14px] font-[Poppins] text-white">
          Help Centre
        </span>
      </section> */}

      <section
        onClick={() => postEvent("web_app_close")}
        className="p-[10px] my-[8px] fade-card w-full rounded-[8px] flex justify-start items-center font-[Poppins] font-medium text-[14px] text-white"
      >
        <figure className="mr-[7px] relative w-[15px] h-[15px]">
          <Image src={"/assets/icons/logout.svg"} alt="Logout icon" fill />
        </figure>

        <span className="font-medium text-[14px] font-[Poppins] text-white">
          Log out
        </span>
      </section>
    </section>
  );
};

export default Profile;

import { TonConnectUI } from "@tonconnect/ui-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type props = {
  avatar: string;
  handleWalletClick: () => void;
  showGamesList: boolean;
  name: string;
  walletLoaded: boolean;
  tonConnectUI: TonConnectUI;
  walletAddress: string;
};
const TopHeader = ({
  walletLoaded,
  avatar,
  handleWalletClick,
  showGamesList,
  name,
  tonConnectUI,
  walletAddress,
}: props) => {
  return (
    <section
      className="
     z-[99999]
       w-full flex justify-between items-center"
    >
      <section className="flex justify-start items-center">
        <figure className="mr-[10px] relative w-[18px] h-[18px] rounded-[50px]">
          <Image
            src={avatar ? avatar : `/assets/icons/avatar.svg`}
            alt="Avatar icon"
            fill
            className="rounded-[inherit]"
          />
        </figure>
        <span className="font-[Poppins] text-[12px] text-white">
          {name || "..."}
        </span>
      </section>

      <section className={`flex justify-start items-center leaderboard-mini-card ${walletLoaded?`px-[8px]`:`px-[4px]`} py-[4px] rounded-[5px]`}>
        {!walletLoaded && (
          <>
            <figure className="mr-[5px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/images/ton.svg"}
                alt="Ton icon"
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
                  <Image
                    src={"/assets/images/ton.svg"}
                    alt="Leaderboard icon"
                    fill
                  />
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
  );
};

export default TopHeader;

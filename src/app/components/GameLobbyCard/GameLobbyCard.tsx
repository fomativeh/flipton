import React, { Dispatch, SetStateAction } from "react";
import "./GameLobbyCard.css";
import Image from "next/image";

const GameLobbyCard = ({setIsCreatingGame}:{setIsCreatingGame:Dispatch<SetStateAction<boolean>>}) => {
  return (
    <section className="my-[15px] fade-card w-full rounded-[8px] px-[15px] py-[10px] flex justify-between items-center">
      <section className="flex flex-col justify-center items-start text-white font-[Poppins]">
        <span>Vishisht Kapoor</span>
        <span className="font-medium text-[10px]">vs</span>
        <span>Prabhakar Rai</span>
      </section>

      <section className="flex flex-col justify-center items-center">
        <figure className="relative w-[28px] h-[28px] mb-[5px]">
            <Image src={"/assets/icons/coin.svg"} alt={"Coin icon"} fill/>
        </figure>
        <span className="font-[Roboto] text-[14px] font-medium text-white">20</span>
      </section>


      <section className="flex flex-col justify-center items-center">
        <span className="flex justify-center items-center w-[76px] h-[18px] progress-waiting-card rounded-[2px] font-[Poppins] text-[10px] text-[#065F24] mb-[15px]">In Progress</span>
        <span className="flex justify-center items-center w-[96px] h-[28px] bg-[#D0BCFF] font-[Roboto] text-[14px] font-medium text-[#381E72] rounded-[4px] opacity-[50%]" onClick={()=>setIsCreatingGame(true)}>Join Now</span>
      </section>
    </section>
  );
};

export default GameLobbyCard;

"use client";
import Image from "next/image";
import React, { useState } from "react";

const Leaderboard = () => {
  const [filter, setFilter] = useState<"This Week" | "All Time">("All Time");
  const handleFilter = (value: "This Week" | "All Time") => {
    // This function sets the selected coin side and resets the other.
    setFilter(value);
  };
  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative flex flex-col justify-start items-center">
      <section
        className={`mt-[40px] w-full flex justify-between items-center mb-[25px]`}
      >
        <section className="flex justify-start items-center">
          <figure className="mr-[10px] relative w-[18px] h-[18px]">
            <Image src={"/assets/icons/avatar.svg"} alt="Avatar icon" fill />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white">
            John Doe
          </span>
        </section>

        <section className="flex justify-start items-center leaderboard-mini-card px-[10px] py-[4px] rounded-[5px]">
          <figure className="mr-[5px] relative w-[20px] h-[20px]">
            <Image src={"/assets/images/ton.svg"} alt="Leaderboard icon" fill />
          </figure>
          <span className="font-[Poppins] text-[12px] text-white font-medium">
            Q1xk...d093
          </span>
        </section>
      </section>

      <section className="my-[15px] fade-card w-full rounded-[8px] py-[17px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        <section className="w-full flex justify-between items-center px-[20px]">
          <span>My Rank</span>
          <span>#1071</span>
        </section>
        <div className="bg-[#8E2DE2] w-full my-[12px] h-[1px]"></div>
        <section className="w-full flex justify-between items-center px-[20px]">
          <span>Amount Earned</span>
          <span>$3600</span>
        </section>
      </section>

      <section className="mb-[50px] mt-[20px] w-[198px] h-[34px] flex justify-between items-center rounded-[4px] bg-[#4A4458]">
        <span
          onClick={() => handleFilter("This Week")}
          className={`flex justify-center items-center cursor-pointer w-[98px] h-[33px] font-[Roboto] font-medium text-[14px] rounded-[inherit] ${
            filter == "This Week" && `bg-[#D0BCFF]`
          }`}
          style={{
            color: `${filter === "This Week" ? `#381E72` : `white`}`,
          }}
        >
          This Week
        </span>
        <span
          onClick={() => handleFilter("All Time")}
          className={`flex justify-center items-center cursor-pointer w-[98px] h-[33px] font-[Roboto] font-medium text-[14px] rounded-[inherit] ${
            filter == "All Time" && `bg-[#D0BCFF]`
          }`}
          style={{
            color: `${filter === "All Time" ? `#381E72` : `white`}`,
          }}
        >
          All Time
        </span>
      </section>

      <section className="mt-[10px] w-[208px] flex justify-between items-center relative">
        <section className="flex flex-col justify-center items-center">
          <figure className="relative w-[60px] h-[60px] mb-[10px]">
            <Image
              src={"/assets/images/face-2.svg"}
              alt="Leaderboard icon"
              fill
            />
          </figure>
          <span className="font-medium font-[Poppins] text-[12px] text-white">
            $22500
          </span>
          <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
            2
          </span>
        </section>

        <section className="w-full h-full absolute top-[-35px] left-0 flex justify-center ">
          <section className="flex flex-col justify-center items-center">
            <figure className="relative w-[60px] h-[60px] mb-[10px]">
              <Image
                src={"/assets/images/face-2.svg"}
                alt="Leaderboard icon"
                fill
              />
            </figure>
            <span className="font-medium font-[Poppins] text-[12px] text-white">
              $26000
            </span>
            <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
              1
            </span>
          </section>
        </section>

        <section className="flex flex-col justify-center items-center">
          <figure className="relative w-[60px] h-[60px] mb-[10px]">
            <Image
              src={"/assets/images/face-3.svg"}
              alt="Leaderboard icon"
              fill
            />
          </figure>
          <span className="font-medium font-[Poppins] text-[12px] text-white">
            $20400
          </span>
          <span className="font-medium font-[Poppins] text-[12px] text-[#4A00E0] bg-[#D0BCFF] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center mt-[4px]">
            3
          </span>
        </section>
      </section>

      <section className="mb-[150px] mt-[25px] fade-card w-full rounded-[8px] flex flex-col justify-center items-center font-[Poppins] font-medium text-[12px] text-white">
        <section className="w-full flex justify-between items-center my-[12px] px-[12px] border-b-[2px] border-b-[#8E2DE2] pb-[12px]">
          <section className="flex items-center justify-start">
            <span className="mr-[8px]">1</span>
            <span>Priyanshu_Rai</span>
          </section>
          <span>$20200</span>
        </section>

        <section className="w-full flex justify-between items-center px-[12px] border-b-[2px] border-b-[#8E2DE2] pb-[12px]">
          <section className="flex items-center justify-start">
            <span className="mr-[8px]">2</span>
            <span>Ashutosh_Rao</span>
          </section>
          <span>$20000</span>
        </section>


        <section className="w-full flex justify-between items-center px-[12px] border-b-[2px] border-b-[#8E2DE2] py-[12px]">
          <section className="flex items-center justify-start">
            <span className="mr-[8px]">3</span>
            <span>Kevin</span>
          </section>
          <span>$19800</span>
        </section>

        <section className="w-full flex justify-between items-center px-[12px] border-b-[2px] border-b-[#8E2DE2] py-[12px]">
          <section className="flex items-center justify-start">
            <span className="mr-[8px]">4</span>
            <span>Kevin</span>
          </section>
          <span>$19800</span>
        </section>

        <section className="w-full flex justify-between items-center px-[12px] py-[12px]">
          <section className="flex items-center justify-start">
            <span className="mr-[8px]">5</span>
            <span>Tyler</span>
          </section>
          <span>$19400</span>
        </section>
      </section>
    </section>
  );
};

export default Leaderboard;

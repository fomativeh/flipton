import { Transaction } from "@/types/userType";
import Image from "next/image";
import React from "react";

type Props = {
  avatar: string;
  balance: number;
  transactions: Transaction;
  name: string;
  username: string;
};

const History = () => {
  return (
    <section className="page-bg w-full min-h-screen px-[20px] h-[100vh] overflow-y-auto relative flex flex-col justify-start items-center pb-[150px]">
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

      <section className="mt-[10px] w-full flex justify-between items-center flex-wrap">
        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>

        <section className="py-[10px] m-[5px] px-[15px] fade-card w-[47%] rounded-[8px] flex flex-col justify-center items-start font-[Poppins] font-medium text-[12px] text-white">
          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/won.svg"} alt="Won icon" fill />
            </figure>
            <span>Won</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/user.svg"} alt="User icon" fill />
            </figure>
            <span>User</span>
          </section>

          <section className="w-full flex justify-start items-center mb-[10px]">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image src={"/assets/icons/coin-2.svg"} alt="Coin icon b" fill />
            </figure>
            <span>700</span>
          </section>

          <section className="w-full flex justify-start items-center">
            <figure className="mr-[15px] relative w-[20px] h-[20px]">
              <Image
                src={"/assets/icons/calender.svg"}
                alt="Calender icon"
                fill
              />
            </figure>
            <span>Sept 11, 2024</span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default History;

import React, { Dispatch, SetStateAction } from "react";
import "./Navbar.scss";
import Image from "next/image";

type NavbarProps = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  photo: string;
};

type pagesProps = {
  title: string;
  iconName: string;
};
const Navbar = ({ currentPage, setCurrentPage, photo }: NavbarProps) => {
  const pages: pagesProps[] = [
    { title: "Game Lobby", iconName: "gameLobby" },
    { title: "Leaderboard", iconName: "leaderboard" },
    { title: "History", iconName: "history" },
    { title: "Profile", iconName: "profile" },
  ];

  return (
    <nav className="z-[99] fixed bottom-0 left-0 w-full h-[fit] bg-[#211F26] py-[12px]">
      <ul className="flex justify-evenly px-[4px] items-center w-full list-none">
        {pages.map((eachPage, i) => {
          return (
            <li
              key={i}
              className="flex flex-col justify-center items-center"
              onClick={() => setCurrentPage(eachPage.title)}
            >
              <section
                className={`px-[20px] py-[8px] rounded-[20px] ${
                  currentPage == eachPage.title ? `bg-[#4A4458]` : `bg-none`
                } mb-[5px]`}
              >
                {eachPage.title == "Profile" ? (
                  <>
                   <figure className="w-[24px] h-[24px] relative rounded-[50px]">
                    <Image
                      src={photo?photo:`/assets/icons/profile.svg`}
                      alt={"Nav icon"}
                      fill
                      className="rounded-[inherit]"
                    />
                  </figure>
                  </>
                ) : (
                  <figure className="w-[24px] h-[24px] relative">
                    <Image
                      src={`/assets/icons/${eachPage.iconName}.svg`}
                      alt={"Nav icon"}
                      fill
                    />
                  </figure>
                )}
              </section>
              <span
                className={`font-[Roboto] text-[14px] ${
                  currentPage == eachPage.title
                    ? `font-semibold text-[#E6E0E9]`
                    : `font-medium text-[#CAC4D0]`
                }`}
              >
                {eachPage.title}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;

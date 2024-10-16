import Image from "next/image";
import React from "react";
import LoaderRing from "../LoaderRing";

const SplashScreen = () => {
  return (
    <main className="absolute w-full h-full top-0 left-0 z-[99999] bg-[#4A00E0] flex flex-col  justify-center items-center">
      <figure className="relative w-[60%] h-[60vw] mb-[25px]">
        <Image
          src={"/assets/images/splash-image.svg"}
          alt="Splash image"
          fill
        />
      </figure>
      <LoaderRing />
    </main>
  );
};

export default SplashScreen;

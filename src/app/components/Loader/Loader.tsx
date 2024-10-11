import Image from "next/image";
import React from "react";
import "./Loader.scss"

const Loader = () => {
  return (
    <section className="z-[999999] absolute top-0 left-0 h-[100vh] w-full flex justify-center items-center bg-black">
      <figure className="loader relative w-[65vw] h-[65vw]">
        <Image src={"/assets/images/logo.svg"} alt="Logo" fill />
      </figure>
    </section>
  );
};

export default Loader;

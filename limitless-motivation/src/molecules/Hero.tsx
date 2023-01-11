import React from "react";
import { AnimatedLines } from "../atoms/AnimatedLines";
import { GlowingButton } from "../atoms/GlowingButton";
import { ScrollingGridBg } from "../atoms/ScrollingGridBg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="relative pt-24 pb-24 text-center">
          <h1 className="uppercase text-8xl font-black leading-tight text-white">
            Go get some.
          </h1>
          <p className="text-lg font-light leading-normal text-indigo-200">
            Daily motivation sent anytime.
          </p>
          <GlowingButton />
        </div>
      </div>
    </section>
  );
};

export default Hero;

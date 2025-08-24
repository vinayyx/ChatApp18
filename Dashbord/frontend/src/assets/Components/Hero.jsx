import React from "react";
import { motion } from "framer-motion"; 
import { ArrowDownRight } from "lucide-react";

export default function Hero({
  heading = "Free Adult Chat and Chat Rooms",
  description = "Join a vibrant community where adults connect in an open, exciting, and liberating environment. Over the years, live adult chat has grown in popularity, and more people than ever are searching for a space where they can freely express themselves, explore fantasies, and build new connections.",
  buttons = {
    secondary: { text: " Chat Now", url: "/login" },
  },
}) {
  return (
    <motion.section
      className="relative  z-40 overflow-hidden  mt-[30vw] md:mt-[8vw] w-full px-4 sm:px-8 lg:px-16  flex justify-center items-center bg-gradient-to-b text-white"
      initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", bounce: 0.32, duration: 0.9 }}
    >
      <div className="container grid items-center gap-10 lg:gap-20 lg:grid-cols-2 p-4 sm:p-6">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center gap-4 text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-4 text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold">
            {heading}
          </h1>
          <p className="text-gray-300 mb-6 sm:mb-8 max-w-xl text-sm sm:text-base lg:text-sm">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.secondary && (
              <button
                className="px-4 sm:px-6 py-2 rounded-md font-medium transition duration-300 border border-gray-400 text-white hover:bg-gray-800 flex items-center justify-center"
                onClick={() => (window.location.href = buttons.secondary.url)}
              >
                {buttons.secondary.text}
                <ArrowDownRight className="inline-block w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex">
          <img
            src="https://www.adultchat.net/images/girl.jpg"
            alt="app screen"
            className="w-56 sm:w-72 md:w-full rounded-md object-cover mix-blend-lighten mx-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { FaRegMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { changeCookie, getCookie } from "@/modules/theme/theme-server";

export default function ThemeButton() {
  const [effect, setEffect] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    const get = async () => {
      const cookies = await getCookie();
      setTheme(cookies as string);
    };
    get();
  }, []);
  return (
    <div className="flex justify-end items-center p-4 transition-all">
      <button
        className={`bg-zinc-400 bg-opacity-30 border-2 rounded-full p-2 group ${
          effect && "animate-wiggle"
        }`}
        onClick={async () => {
          setEffect(true);
          const callback = await changeCookie();
          setTheme(callback as string);
        }}
        onAnimationEnd={() => {
          setEffect(false);
        }}
      >
        {theme === "dark" ? (
          <FaSun className="h-7 w-7 group-hover:text-amber-500 transition duration-200" />
        ) : (
          <FaRegMoon className="h-7 w-7 group-hover:text-[#532d91] transition duration-200" />
        )}
      </button>
    </div>
  );
}

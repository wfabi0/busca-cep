"use client";

import { FaRegMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const [effect, setEffect] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-end items-center p-4 transition-all">
      <button
        className={`bg-zinc-400 bg-opacity-30 border-2 rounded-full p-2 group focus:outline-none focus:shadow-none ${
          effect && "animate-wiggle"
        }`}
        onClick={async () => {
          setEffect(true);
          setTheme(theme === "dark" ? "light" : "dark");
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

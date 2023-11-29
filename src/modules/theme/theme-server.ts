"use server";

import { cookies } from "next/headers";

export async function getCookie() {
  const cookieStore = cookies();
  return cookieStore.get("theme")?.value;
}

export async function changeCookie() {
  const cookieStore = cookies();
  const currentTheme = await getCookie();
  cookieStore.set({
    name: "theme",
    value: currentTheme === "light" ? "dark" : "light",
    path: "/",
    httpOnly: false,
  });
  return getCookie();
}

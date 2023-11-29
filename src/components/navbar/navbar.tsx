import { cookies } from "next/headers";
import ThemeButton from "./theme-button";
import { getCookie } from "@/modules/theme/theme-server";

export default async function Navbar() {
  const cookieStore = cookies();
  const theme = await getCookie();
  return <ThemeButton />;
}

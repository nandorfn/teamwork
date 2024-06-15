"use server";
import { verifyAuth } from "@auth";
import { MyTask } from "@components/pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return redirect("/login");
  }

  const verifiedToken = verifyAuth(token.value);
  if (!verifiedToken) {
    return redirect("/login");
  }

  return (
    <MyTask />
  );
}

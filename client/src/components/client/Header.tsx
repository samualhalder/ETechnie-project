"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access-token");
      setToken(accessToken);
    }
  }, []);
  return (
    <>
      <div className=" fixed top-0 h-[60px] bg-[#2E82D6] w-full flex items-center px-5 gap-5 justify-between">
        {/* Logo Section */}
        <div>
          <h1 className="hidden sm:block text-white text-2xl tracking-widest text-bold font-mono">
            ETechnieShop
          </h1>
        </div>
        {/* Link Sections */}
        <div className="flex text-white gap-5 md:mx-10">
          <Link href={"/"}>
            <p>Home</p>
          </Link>
        </div>
        {/*  Avatar & login-signin */}
        <div className=" text-white flex">
          {token ? (
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => {
                  localStorage.removeItem("access-token");
                  setToken(null);
                  router.refresh();
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href={"/signin"}>
              <div className="border-[1px] border-white p-2 rounded-md hover:bg-blue-400 cursor-pointer">
                Sign in
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

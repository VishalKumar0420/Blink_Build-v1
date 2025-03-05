"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

import {
  EyeClosed,
  HelpCircleIcon,
  LogOut,
  LucideDownload,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Actioncontext } from "@/context/ActionContext";
import { useSidebar } from "../ui/sidebar";
const Header = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const pathname = usePathname();
  const { action, setAction } = useContext(Actioncontext);
  const { toggleSidebar } = useSidebar();

  const onActionbtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div
      className="p-4 flex justify-between items-center border-b-2"
      style={{ backgroundColor: Colors.BACKGROUND }}
    >
      <Link href="/" className="ml-5">
        <EyeClosed size={36} className="cursor-pointer" />
      </Link>

      <div>
        {!userDetails?.name ? (
          <div className="flex gap-2">
            <Button variant="ghost" className="bg-slate-500 hover:bg-slate-700">
              Sign In
            </Button>
            <Button
              className="text-white font-bold"
              style={{ backgroundColor: Colors.BLUE }}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div>
            {(pathname?.includes("workspace") || pathname === "/") && (
              <div className="flex gap-2 items-center justify-center">
                {pathname?.includes("workspace") && (
                  <Button
                    variant="ghost"
                    className="bg-slate-600 hover:bg-slate-700"
                    onClick={() => onActionbtn("export")}
                  >
                    <LucideDownload />
                    Export
                  </Button>
                )}
                {userDetails?.picture && (
                  <Image
                    src={userDetails.picture}
                    alt="User"
                    width={30}
                    height={30}
                    className="rounded-full w-[30px] h-[30px] cursor-pointer"
                    onClick={toggleSidebar}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

import {
  AlignJustify,
  CrossIcon,
  EyeClosed,
  LucideDownload,
  X,
} from "lucide-react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Actioncontext } from "@/context/ActionContext";
import { useSidebar } from "../ui/sidebar";
import SignInDialog from "./SignInDialog";
import { usePreview } from "@/context/PreviewContext";
import { toast } from "sonner";
const Header = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const pathname = usePathname();
  const { action, setAction } = useContext(Actioncontext);
  const {open,toggleSidebar } = useSidebar();
  const[openDialog,setOpenDialog]=useState(false)
  const { hasPreviewed } = usePreview();

  const onActionbtn = (action) => {
    if (action === "export" && !hasPreviewed) {
      toast.warning("Please preview your project before exporting.");
      return;
    }
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
          <div>
            {/* <Button variant="ghost" className="bg-slate-500 hover:bg-slate-700">
              Sign In
            </Button> */}
            <Button
              className="text-white font-bold"
              style={{ backgroundColor: Colors.BLUE }}
              onClick={()=>setOpenDialog(true)}
            >
              Get Started
            </Button>
            <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
          </div>
        ) : (
          <div>
            {(pathname?.includes("workspace") || pathname === "/") && (
              <div className="flex gap-2 items-center justify-center">
                {pathname?.includes("workspace") && (
                  <div>
                  <Button
                    variant="ghost"
                    className="bg-slate-600 hover:bg-slate-700"
                    onClick={() => onActionbtn("export")}
                  >
                    <LucideDownload />
                    Export
                  </Button>
                  </div>
                )}
                {userDetails?.picture&& (
                  <div className="flex items-center gap-5 hover:bg-slate-600 p-1 rounded-lg">
                    {!open?<AlignJustify onClick={toggleSidebar} className="cursor-pointer"/>:
                    <X onClick={toggleSidebar} className="cursor-pointer"/>}
                  </div>
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

"use client"; // If using Next.js App Router (pages in 'app/' directory)

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
import { useContext, useState, useEffect } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { userDetails } = useContext(UserDetailsContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Sidebar>
      <SidebarHeader className="border-b-2">
      <div>
          {userDetails?.picture && (
            <div className="flex  p-3 mt-[-4px] gap-8 items-center  w-full">
              <Image
                src={userDetails.picture}
                alt="User"
                width={50}
                height={50}
                className="rounded-full w-[35px] h-[35px] cursor-pointer"
              />
              <h2 className="text-xl">Your Chats</h2>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <WorkspaceHistory />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

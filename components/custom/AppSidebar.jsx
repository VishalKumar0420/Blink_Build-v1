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
import Colors from "@/data/Colors";
import { useContext } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";

export function AppSidebar() {
  const { userDetails, setUsersDetails } = useContext(UserDetailsContext);
  return (
    <Sidebar>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent style={{backgroundColor:"#101010"}}>
        <div>
      {userDetails?.picture && (
          <div className="flex gap-5 justify-center items-center p-2 w-full" >
            <Image
              src={userDetails.picture}
              alt="User"
              width={50}
              height={50}
              className="rounded-full w-[40px] h-[40px] cursor-pointer"
            />
            <Button>
              <MessageCircleCode />
              Start New Chat
            </Button>
          </div>
        )}
        </div>
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

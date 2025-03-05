import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { MessageCircleCode } from "lucide-react"
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
import Colors from "@/data/Colors";
  
  export function AppSidebar() {    
    return (
      <Sidebar>
        <SidebarHeader>
        </SidebarHeader>
        <SidebarContent className="p-3">
            <Button><MessageCircleCode/>Start New Chat</Button>
          <SidebarGroup />
          <WorkspaceHistory/>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <SideBarFooter/>
        </SidebarFooter>
      </Sidebar>
    )
  }
  
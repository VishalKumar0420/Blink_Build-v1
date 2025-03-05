"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import Colors from "@/data/Colors";

const WorkspaceHistory = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [workspaceList, setWorkspaceList] = useState();
  const { toggleSidebar } = useSidebar();
  const convex = useConvex();

  useEffect(() => {
    userDetails && getAllWorkspace();
  }, [userDetails?._id]);

  const getAllWorkspace = async () => {
    const result = await convex.query(api.workspace.getAllWorkspace, {
      userId: userDetails?._id,
    });
    setWorkspaceList(result);
  };
  return (
    <div className="flex justify-start flex-col px-2">
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div className="flex flex-col p-1">
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
            <Link href={"/workspace/" + workspace?._id} key={index}>
              <h2 onClick={toggleSidebar} className="text-sm p-1 text-gray-400 mt-2 font-light cursor-pointer rounded-md capitalize hover:text-white hover:bg-slate-600 transition duration-300" >
                {workspace?.messages[0]?.content}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default WorkspaceHistory;

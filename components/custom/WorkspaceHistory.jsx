"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const [workspaceList, setWorkspaceList] = useState([]);
  const { toggleSidebar } = useSidebar();
  const convex = useConvex();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (userDetails) {
      getAllWorkspace();
    }
  }, [userDetails]);

  const getAllWorkspace = async () => {
    const result = await convex.query(api.workspace.getAllWorkspace, {
      userId: userDetails?._id,
    });
    setWorkspaceList(result);
  };

  return (
    <div className="flex flex-col mx-2">
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <Link href={"/workspace/" + workspace?._id} key={index}>
            <h2
              onClick={() => {
                toggleSidebar();
                setActiveIndex(index);
              }}
              className={`text-md p-1 mt-2 font-light cursor-pointer rounded-md capitalize truncate-text transition duration-300
                ${
                  activeIndex === index
                    ? "text-white bg-slate-600"
                    : "text-gray-400 hover:text-white hover:bg-slate-800"
                }`}
            >
              {workspace?.messages[0]?.content}
            </h2>
          </Link>
        ))}
    </div>
  );
};

export default WorkspaceHistory;

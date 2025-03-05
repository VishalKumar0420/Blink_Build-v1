"use client";

import React, { use, useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import LookUp from "@/data/LookUp";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import { useParams } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import SandpackPreviewClient from "./SandpackPreviewClient";

//Token calculation
export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};
const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(LookUp?.DEFAULT_FILE);
  const { messages, setMesages } = useContext(MessagesContext);
  const updateFiles = useMutation(api.workspace.updateFiles);
  const updateTokens = useMutation(api.users.updateTokens);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const[loading,setLoading]=useState(false)
  const { id } = useParams();
  const convex = useConvex();
  const {action,setAction}=useState();

  useEffect(() => {
    id && getFiles();
  }, [id]);

  // useEffect(()=>
  // {
  //   setActiveTab('preview')
  // },[action])

  const getFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...LookUp.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        generateAiCode();
      }
    }
  }, [messages]);

  const generateAiCode = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
      const result = await axios.post("/api/gen-ai-code", { prompt: PROMPT });
      console.log("Final Result", result.data);
      const aiRes = result.data;
      // Merge AI-generated files with existing ones
      const mergedFiles = { ...LookUp.DEFAULT_FILE, ...aiRes?.files };
      setFiles(mergedFiles);
      await updateFiles({
        workspaceId: id,
        files: aiRes?.files,
      });

      //Update Token in DB
      const token =Number(userDetails?.token) - Number(countToken(JSON.stringify(aiRes)));
      await updateTokens({
        userId: userDetails?._id,
        token: token,
      });
      setUserDetails(prev=>({
        ...prev,
        token:token
      }))
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="w-full p-2 border">
        <div className="flex items-center justify-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 rounded-full">
          <h2
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        files={files}
        customSetup={{
          dependencies: {
            ...LookUp.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          showNavigator: true,
          showTabs: true,
          closableTabs: true,
          activeFile: "/src/App.jsx",
          visibleFiles: ["/src/App.jsx", "/index.js"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh"}}/>
            </>
          ) : (
            <>
              <SandpackPreviewClient/>
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className=" flex p-10 bg-gray-900 opacity-80 absolute rounded-lg top-0 w-full h-full items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating Your code...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;

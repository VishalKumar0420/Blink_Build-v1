"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LookUp from "@/data/LookUp";
import { ArrowRight, Link2, Loader2Icon } from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { MessagesContext } from "@/context/MessagesContext";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";

//Token calculation
export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const Chatview = () => {
  const { toggleSidebar } = useSidebar();
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const updateMessages = useMutation(api.workspace.updateMessages);
  const updateTokens = useMutation(api.users.updateTokens);

  useEffect(() => {
    if (id) {
      getWorkspaceData();
    }
  }, [id]);

  // Function to fetch workspace data
  const getWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.getWorkspace, {
        workspaceId: id,
      });
      if (result?.messages) {
        setMessages(result.messages);
      }
      console.log(result);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "user") {
        getAiResponse();
      }
    }
  }, [messages]);

  const getAiResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const response = await axios.post("/api/ai-chat", { prompt: PROMPT });
      const aiRes = {
        role: "ai",
        content: response.data.result,
      };
      setMessages((pre) => [...pre, aiRes]);

      //Update msg in DB
      await updateMessages({
        messages: [...messages, aiRes],
        workspaceId: id,
      });

      //Update Token in DB
      const token =
        Number(userDetails?.token) - Number(countToken(JSON.stringify(aiRes)));

      setUserDetails((prev) => ({
        ...prev,
        token: token,
      }));
      await updateTokens({
        userId: userDetails?._id,
        token: token,
      });
    } catch (error) {
      console.error(
        "Error in AI response:",
        error.response?.data || error.message
      );
    }

    setLoading(false);
  };

  const onGenerate = (userInput) => {
    if (userDetails?.token < 10) {
      toast("You dont have enough token");
      return;
    }
    if (!userInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userInput,
      },
    ]);
    setUserInput("");
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 scrollbar-hide overflow-y-scroll px-5">
        {messages?.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex items-center gap-3 justify-start"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              {msg?.role == "user" && userDetails?.picture && (
                <Image
                  src={userDetails?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}

        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex items-center gap-3 justify-start leading-7"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>

      {/* input section  */}
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full max-h-56 resize-none h-24"
            placeholder={LookUp.HERO_HEADING}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            aria-label="User input field"
            minLength={1}
            id="userInputField"
            name="userInput"
          />
          {userInput.trim() && (
            <ArrowRight
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
              onClick={() => onGenerate(userInput)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <Link2></Link2>
          <div>
            {userDetails && (
              <Image
                onClick={toggleSidebar}
                src={userDetails?.picture}
                alt="user_logo"
                width={30}
                height={30}
                className="rounded-full cursor-pointer"
              ></Image>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatview;

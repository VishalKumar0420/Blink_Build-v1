"use client";

import LookUp from "@/data/LookUp";
import React, { useContext, useState, useEffect } from "react";
import { ArrowRight, Link2 } from "lucide-react"; // ✅ Removed incorrect Link import
import Link from "next/link"; // ✅ Correct Next.js Link import
import Colors from "@/data/Colors";
import { MessagesContext } from "@/context/MessagesContext";
import SignInDialog from "./SignInDialog";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.createWorkspace);
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !userDetails?._id) {       
      setUserDetails(JSON.parse(storedUser));
    }
    
  }, []);

  const onGenerate = async (input) => {
    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }
    if (userDetails?.token < 10) {
      toast("You dont have enough token");
      return;
    }

    if (!userDetails?._id) {
      console.error("❌ User ID is missing, cannot create workspace.");
      return;
    }

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      console.warn("⚠️ User input is empty.");
      return;
    }

    const msg = { role: "user", content: trimmedInput };
    setMessages((prevMessages) => [...prevMessages, msg]);

    try {
      console.log("Calling CreateWorkspace with:", {
        userId: userDetails?._id,
        messages: [msg],
      });

      const workspaceId = await CreateWorkspace({
        userId: userDetails?._id,
        messages: [msg],
      });

      if (!workspaceId) {
        console.error("❌ Workspace creation failed.");
        return;
      }

      console.log("✅ Workspace created successfully:", workspaceId);
      router.push(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("❌ Error creating workspace:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:scroll-mt-52 gap-x-22">
      <div className="flex gap-2">
        <span className="font-bold text-4xl">{LookUp.HERO_MAIN_HEADING1}</span>
        <span className="font-bold text-4xl">{LookUp.HERO_MAIN_HEADING2}</span>
      </div>
      <p className="text-gray-400 font-medium my-3">{LookUp.HERO_DESC}</p>

      {/* ✅ Input Box */}
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full max-h-56 resize-none h-32"
            placeholder={LookUp.HERO_HEADING}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            aria-label="User input field"
            minLength={1}
            id="userInputField"
            name="userInput"
          />
          <ArrowRight
            className={`bg-slate-700 hover:bg-slate-600 p-2 h-10 w-10 rounded-md cursor-pointer ${
              !userInput.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onGenerate(userInput)}
          />
        </div>
        <div>
          <Toaster />
          <Link2 onClick={() => toast("This Feature is Comming Soon🤞")} />
        </div>
      </div>

      {/* ✅ Suggestions */}
      <div className="flex flex-wrap max-w-2xl justify-center items-center gap-3 mt-8">
        {LookUp?.SUGGESTIONS.map((suggestion, index) => (
          <h2
            key={index}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setUserInput(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>

      {/* ✅ Sign-in Dialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Hero;

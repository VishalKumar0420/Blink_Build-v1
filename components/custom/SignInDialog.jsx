import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LookUp from "@/data/LookUp";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { setUserDetails } = useContext(UserDetailsContext);
  const createUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Token Response:", tokenResponse);

        // Fetch user info from Google API
        const { data: user } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        // console.log("User Info:", user);

        const newUser = {
          name: user.name,
          email: user.email,
          picture: user.picture,
          uid: uuidv4(),
        };

        // Store user details in Convex
        await createUser(newUser);

        // Store user in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(newUser));
        }

        setUserDetails(newUser);
        toast.success("Successfully signed in! 🎉");
        console.log("User data set successfully", newUser);
        closeDialog(false);
        
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("Authentication failed. Please try again.");
      }
    },
    onError: (errorResponse) => console.log("Login Error:", errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="w-[450px] sm:w-[600px] md:w-[700px] lg:w-[800px] max-w-3xl">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="font-bold text-xl text-center text-white">
              {LookUp.SIGNIN_HEADING}
            </h1>
            <p className="text-center text-gray-400">
              {LookUp.SIGNIN_SUBHEADING}
            </p>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-400"
              onClick={googleLogin}
            >
              Sign In With Google
            </Button>
            <p className="text-center text-gray-400">
              By using Bolt, you agree to the collection of usage data for
              analytics.
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;

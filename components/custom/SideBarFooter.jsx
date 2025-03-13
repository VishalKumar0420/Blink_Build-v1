"use client";
import { LogOut, LucideHelpCircle, Settings, Wallet2 } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { toast } from "sonner";

const SideBarFooter = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const handleLogout = () => {
    // Remove the data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("__paypal_storage__");
    setUserDetails(null);
    
    // Redirect to login page
    router.push("/");

    // Close the sidebar
    toggleSidebar();
  };

  const options = [
    { name: "Settings", icon: Settings, comingSoon: true },
    { name: "Help Center", icon: LucideHelpCircle, comingSoon: true },
    { name: "My Subscription", icon: Wallet2, path: "/pricing" },
    { name: "Sign Out", icon: LogOut, action: handleLogout },
  ];

  const onOptionClick = (option) => {
    if (option.comingSoon) {
      toast.success("This feature is coming soon! 🚀"); // Replace with toast if needed
    } else if (option.action) {
      option.action();
    } else if (option.path) {
      router.push(option.path);
      toggleSidebar();
    }
  };

  return (
    <div className="flex flex-col">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          className="w-full flex justify-start"
          variant="ghost"
        >
          <option.icon className="mr-2" />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;

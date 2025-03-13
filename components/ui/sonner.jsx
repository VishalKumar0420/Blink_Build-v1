"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme } = useTheme() || { theme: "system" };

  return (
    <Sonner
      theme={theme ?? "system"}
      className="toaster group"
      position="top-center" // Move to top center
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        style: {
          success: {
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "1px solid #388e3c",
          },
          error: {
            backgroundColor: "#f44336",
            color: "#fff",
            border: "1px solid #d32f2f",
          },
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

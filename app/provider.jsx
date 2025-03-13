  "use client";

  import React, { useEffect, useState } from "react";
  import { ThemeProvider as NextThemesProvider } from "next-themes";
  import Header from "@/components/custom/Header";
  import { MessagesContext } from "@/context/MessagesContext";
  import { UserDetailsContext } from "@/context/UserDetailsContext";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import { ConvexProvider, ConvexReactClient } from "convex/react";
  import { api } from "@/convex/_generated/api";
  import { SidebarProvider } from "@/components/ui/sidebar";
  import { AppSidebar } from "@/components/custom/AppSidebar";
  import { PayPalScriptProvider } from "@paypal/react-paypal-js";
  import { Actioncontext } from "@/context/ActionContext";
  import { useRouter } from "next/navigation";
  import { PreviewProvider } from "@/context/PreviewContext";
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const Provider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [action,setAction]=useState()
    const route=useRouter();
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY;
    const paymentClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    useEffect(() => {
      setLoading(true)
      const isAuthenticated = async () => {
        if (typeof window === "undefined") return;

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.log("No user found in local storage");
          setLoading(false);
          return;
        }

        try {

          const user = JSON.parse(storedUser);
          if (!user) {
            console.warn("User email is missing in local storage");
            route.push('/');
            setLoading(false);
            return;
          }
          const result = await convex.query(api.users.GetUser, {
            email: user.email,
          });
          setUserDetails(result);
          console.log("Fetched user details:", result);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
        finally {
          setLoading(false);
        }
      };

      isAuthenticated();
    }, [userDetails&&userDetails?._id]);

    if (!clientId) {
      console.error("Google Client ID is missing! Check .env.local");
    }
    
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <PayPalScriptProvider
          options={{
            "client-id": paymentClientId || "",
            currency: "USD",
            intent: "capture",
          }}
        >
          <ConvexProvider client={convex}>
            <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
              <MessagesContext.Provider value={{ messages, setMessages }}>
                <Actioncontext.Provider value={{action,setAction}}>
                <NextThemesProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
                >
                  <SidebarProvider defaultOpen={false} className="flex flex-col relative">
                  <PreviewProvider>
                  <Header/>
                    {children}
                    <div className="absolute">
                    <AppSidebar />
                    </div>
                    </PreviewProvider>
                  </SidebarProvider>
                </NextThemesProvider>
                </Actioncontext.Provider>
              </MessagesContext.Provider>
            </UserDetailsContext.Provider>
          </ConvexProvider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    );
  };

  export default Provider;

import { useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Actioncontext } from "@/context/ActionContext";

const SandpackPreviewClient = () => {
  const previewRef = useRef(null);
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(Actioncontext);

  useEffect(() => {
      getSandpackClient();
  }, [sandpack&&action]);

  const getSandpackClient = async () => {
    try {
      const client = await previewRef.current?.getClient();
      if (!client) return;

      console.log(client);
      const result = await client.getCodeSandboxURL();
      console.log(result);
      
      // Handling action based on the actionType
       if (action?.actionType === "export") {
        window.open(result?.editorUrl, "_blank");
      }
    } catch (error) {
      console.error("Error getting Sandpack client:", error);
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "80vh" }}
      showNavigator={true}
    />
  );
};

export default SandpackPreviewClient;

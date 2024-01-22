"use client";

import React, { createContext, useContext } from "react";
import { useState } from "react";

type IsShowType = "show" | "close";
interface ICalloutContext {
  isShow: IsShowType;
  showNotif: (message: string) => void;
  message: string;
}

const CalloutContext = createContext<ICalloutContext>({
  isShow: "close",
  showNotif: () => {},
  message: "",
});

const CalloutContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShow, setIsShow] = useState<IsShowType>("close");
  const [message, setMessage] = useState<string>("");

  const showNotif = (notifMessage: string) => {
    setIsShow("show");
    setMessage(notifMessage);
    setTimeout(() => {
      setIsShow("close");
    }, 300);
  };

  return (
    <CalloutContext.Provider value={{ isShow, showNotif, message }}>
      {children}
    </CalloutContext.Provider>
  );
};

export default CalloutContextProvider;
export const useCalloutContext = () => useContext(CalloutContext);

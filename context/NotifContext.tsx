"use client";

import React, { createContext, useContext } from "react";
import { useState } from "react";

export type NotifType = "error" | "success" | "warning";

interface INotifContent {
  show: boolean;
  message: string;
  type: NotifType;
}
interface INotifContext {
  content: INotifContent;
  showNotif: (message: string, type: NotifType) => void;
}

const NotifContext = createContext<INotifContext>({
  content: {
    show: false,
    message: "",
    type: "error",
  },
  showNotif: () => {},
});

const NotifContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<INotifContent>({
    show: false,
    message: "",
    type: "error",
  });

  const showNotif = (message: string, type: NotifType) => {
    setContent({ type: type, show: true, message: message });
    setTimeout(() => setContent((prev) => ({ ...prev, show: false })), 3000);
  };

  return (
    <NotifContext.Provider value={{ content, showNotif }}>
      {children}
    </NotifContext.Provider>
  );
};

export default NotifContextProvider;
export const useNotifContext = () => useContext(NotifContext);

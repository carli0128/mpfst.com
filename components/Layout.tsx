import ChatButton from "./ChatButton";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChatButton />
    </>
  );
}

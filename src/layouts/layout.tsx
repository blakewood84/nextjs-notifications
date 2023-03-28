import { Navbar } from "@/features/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="h-screen border2 border-rose-500">
        <Navbar />
        <div className="h-full pt-16">{children}</div>
      </div>
    </>
  );
}

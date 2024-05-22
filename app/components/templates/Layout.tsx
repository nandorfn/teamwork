'use client';
import { useSelectedLayoutSegments } from "next/navigation";
import { Aside } from "../molecules";

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const segments = useSelectedLayoutSegments();
  const withoutLayout = ["login", "forgot-password", "register"]
  
  if (withoutLayout.includes(segments[1])) {
    return (children)
  }
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-screen">
        <Aside />
        {children}
      </div>
    </div>
  );
};

export default Layout;
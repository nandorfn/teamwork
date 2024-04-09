'use client';
import { useSelectedLayoutSegments } from "next/navigation";
import { Aside, Navbar } from "../molecules";

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const segments = useSelectedLayoutSegments();
  
  if (segments[1] === 'login') {
    return (children)
  }
  
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex flex-row h-full">
        <Aside />
        {children}
      </div>
    </div>
  );
};

export default Layout;
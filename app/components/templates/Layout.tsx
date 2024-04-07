import { Aside, Navbar } from "../molecules";

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
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
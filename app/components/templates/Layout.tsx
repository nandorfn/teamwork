import { Navbar } from "../molecules";

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default Layout;
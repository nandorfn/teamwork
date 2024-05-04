import React from "react";
import { ModeToggle } from "../ModeToggle";

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-dark-grey">
      <nav className="px-6 py-3 flex justify-between">
        <h1 className="text-3xl font-medium">teamwork</h1>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;

import { Icon } from "@components/atoms";
import React from "react";
import teamwork from "@assets/icons/teamwork.png";
import { ModeToggle } from "../ModeToggle";

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-dark-grey">
      <nav className="p-6 flex justify-between">
        <h1 className="text-3xl font-medium">teamwork</h1>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;

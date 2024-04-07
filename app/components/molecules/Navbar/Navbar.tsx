import { Icon } from "@components/atoms";
import React from "react";
import teamwork from "@assets/icons/teamwork.png";

const Navbar: React.FC = () => {
  return (
    <header className="border-b-2 border-dark-grey">
      <nav className="p-6">
        <Icon 
          src={teamwork} 
          alt="teamwork" 
          width={120} 
          height={120}
        />
      </nav>
    </header>
  );
};

export default Navbar;

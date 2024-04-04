import { Icon } from "@components/atoms";
import React from "react";
import teamwork from "@assets/icons/teamwork.png";

const Navbar: React.FC = () => {
  return (
    <header className="border-b-2 border-dark-grey">
      <nav className="p-8">
        <Icon 
          src={teamwork} 
          alt="teamwork" 
          width={200} 
          height={200}
        />
      </nav>
    </header>
  );
};

export default Navbar;

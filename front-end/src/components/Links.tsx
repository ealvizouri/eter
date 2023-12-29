import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, className, children }) => {
  return (
    <ReactRouterLink
      to={to}
      className={`inline-block px-4 py-2 text-white bg-green-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${className || ""}`}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;

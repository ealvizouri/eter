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
      className={`text-black-500 hover:underline ${className || ""}`}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;

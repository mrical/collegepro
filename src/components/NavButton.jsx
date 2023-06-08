import classNames from "classnames";
import { NavLink } from "react-router-dom";
import React from "react";

function NavButton({ activeClass, className, title, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames({
          "text-white tracking-widest font-mono font-medium mx-2 px-2 hover:text-slate-200 ": true,
          "border-b hover:border-slate-200": isActive,
          className: !!className,
          activeClass: isActive && !!activeClass,
        })
      }
    >
      {title}
    </NavLink>
  );
}

export default NavButton;

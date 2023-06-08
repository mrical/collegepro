import classNames from "classnames";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function HelpLayout() {
  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <nav>
            <NavLink
              to="faq"
              className={({ isActive }) =>
                classNames({
                  "text-black rounded-md border bg-white": true,
                  "bg-blue-400": isActive,
                })
              }
            >
              Faq
            </NavLink>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                classNames({
                  "text-black rounded-md border bg-white": true,
                  "bg-blue-400": isActive,
                })
              }
            >
              Contact
            </NavLink>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default HelpLayout;

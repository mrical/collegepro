import { getAuth, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [rightNav, setRightNav] = useState(
    <>
      <NavButton to="/register" title="Create Account" />
      <NavButton to="/login" title="Login" />
    </>
  );
  const auth = getAuth();
  const { user, logOut, isAuth } = useContext(UserContext);

  function handleSignOutClick() {
    signOut(auth)
      .then(() => {
        logOut();
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  useEffect(() => {
    if (isAuth) {
      setRightNav(
        <button
          className="text-white tracking-widest font-mono font-medium mx-2 px-2 hover:text-slate-200"
          onClick={handleSignOutClick}
        >
          Logout <span>{user.firstName}</span>
        </button>
      );
    } else {
      setRightNav(
        <>
          <NavButton to="/register" title="Create Account" />
          <NavButton to="/login" title="Login" />
        </>
      );
    }
  }, [isAuth]);

  return (
    <header className="bg-blue-500 h-10 drop-shadow-md">
      <div className="sm:w-3/4 xl:w-2/3 mx-auto flex justify-between py-2 px-5">
        <nav>
          <NavButton to="/" title="Home" />
          <NavButton to="/about" title="About" />
          <NavButton to="/help/faq" title="Help" />
        </nav>
        <nav>{rightNav}</nav>
      </div>
    </header>
  );
}

export default Header;

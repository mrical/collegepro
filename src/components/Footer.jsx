import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="h-14 bg-blue-500 p-2">
      <div className="text-center">
        <Link className="text-white hover:text-slate-300 p-2" to="home">
          Home
        </Link>
        <Link className="text-white hover:text-slate-300 p-2" to="about">
          About
        </Link>
        <Link className="text-white hover:text-slate-300 p-2" to="help/faq">
          Faq
        </Link>
        <Link className="text-white hover:text-slate-300 p-2" to="help/contact">
          Contact
        </Link>
      </div>
      <div className="text-center">Copyrigt</div>
    </footer>
  );
}

export default Footer;

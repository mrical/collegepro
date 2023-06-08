import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div>
      {/* <h1 className="text-ceter">Contact</h1> */}
      <div className="p-5 border mt-5 flex flex-col text-center">
        <span>Created By</span>
        <Link to="">Mrical Singhal</Link>
        <Link>Bharat Soni</Link>
        <Link>Kanishk Gupta</Link>
      </div>
    </div>
  );
}

export default Contact;

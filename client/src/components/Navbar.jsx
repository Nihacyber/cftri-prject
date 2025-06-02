import React from "react";
import { Link } from "react-router-dom";

// Use the orange color (HTML style: #ff6600)
const ORANGE = "#ff6600";
const BLUE = "#003366"; // Original blue for the title

const HeaderTop = () => (
  <div style={{ backgroundColor: ORANGE }} className="text-white text-sm">
    <div className="container-fluid mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center py-2">
        <div className="text-center md:w-1/3 mb-1 md:mb-0 flex items-center justify-center gap-2">
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          <span className="font-medium">+91-821-2514534</span>
        </div>
        <div className="text-center md:w-1/3 mb-1 md:mb-0 flex items-center justify-center gap-2">
          <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          <span className="font-medium">ttbd@cftri.res.in</span>
        </div>
        <div className="text-center md:w-1/3 flex items-center justify-center gap-4">
          <a
            href="/userLogin"
            className="hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
            <span className="font-medium">Login</span>
          </a>
          <span className="text-white/60">|</span>
          <a
            href="/Userregister"
            className="hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-user-plus" aria-hidden="true"></i>
            <span className="font-medium">Register</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ introRef }) => (
  <>
    {/* Header Top Area */}
    <HeaderTop />

    <header
      className="w-full shadow"
      style={{ backgroundColor: "#fff4e6" }} // Light orange background to match Opportunities section
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4">
        <Link to="/" className="mb-2 md:mb-0">
          <img
            src="https://cftri.res.in/assets/user/images/Logo.png"
            alt="CFTRI Logo"
            className="w-36 h-auto mx-auto md:mx-0"
          />
        </Link>
        <div className="text-center">
          <h4
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#003366" }} // Make the whole title blue
          >
            CSIR-CFTRI Industry &amp; Business Connect
          </h4>
          <span
            className="block font-semibold italic"
            style={{ color: ORANGE }}
          >
            "From Pilot to Production – Faster, Smarter"
          </span>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/CSIR-Logo-With-Tagline-Seleceted-Bilingual.png/1200px-CSIR-Logo-With-Tagline-Seleceted-Bilingual.png?20230228173223"
          alt="CSIR Logo"
          className="w-20 h-auto mx-auto md:mx-0"
        />
      </div>
      {/* Navbar */}
      <nav className="bg-blue-900 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
          <Link to="/" className="font-bold text-lg">
            CSIR-CFTRI
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="hover:underline flex items-center gap-1"
            >
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <Link
              to="#"
              className="hover:underline flex items-center gap-1"
              onClick={e => {
                e.preventDefault();
                if (introRef && introRef.current) {
                  introRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <i className="fa-solid fa-file-lines"></i> About Us
            </Link>
            <Link
              to="/technologies"
              className="hover:underline flex items-center gap-1"
            >
              <i className="fa-solid fa-gear"></i> Technologies
            </Link>
          </div>
        </div>
      </nav>
    </header>
  </>
);

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import NavbarButton from "../ui/NavbarButton";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="py-4 px-6 sm:px-10 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-xl sm:text-3xl font-bold">Slice Up</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 lg:gap-14 items-center text-white bg-white/10 backdrop-blur-md rounded-3xl py-2 lg:py-3 px-6 lg:px-10">
          <a
            href="#"
            className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </a>
          <a
            href="#services"
            className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Chat Now
          </a>
          <a
            href="#ourwork"
            className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Chat Rules
          </a>
          <a
            href="#contact"
            className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Chat Safety
          </a>
        </div>

        {/* Desktop Button */}
        <Link className="hidden md:block" to="/login">
          <NavbarButton />
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-white/10 backdrop-blur-md rounded-l-2xl flex flex-col items-center gap-6 py-20 text-white shadow-lg md:hidden"
        >
          <a href="#" onClick={() => setIsOpen(false)}>
            About Us
          </a>
          <a href="#services" onClick={() => setIsOpen(false)}>
            Chat Now
          </a>
          <a href="#ourwork" onClick={() => setIsOpen(false)}>
            Chat Rules
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Chat Safety
          </a>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <NavbarButton />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
